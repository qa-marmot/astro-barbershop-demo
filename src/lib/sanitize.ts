const ALLOWED_TAGS = new Set([
  "p","br","strong","b","em","i","u","s",
  "h2","h3","h4","ul","ol","li","a","img",
  "blockquote","hr","table","thead","tbody","tr","th","td",
  "figure","figcaption",
]);

const ALLOWED_ATTRS: Record<string, string[]> = {
  a:   ["href", "rel", "target"],
  img: ["src", "alt", "width", "height", "loading"],
  td:  ["colspan", "rowspan"],
  th:  ["colspan", "rowspan"],
};

export function sanitizeHtml(html: string): string {
  let safe = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");

  safe = safe.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g, (match, tag) => {
    const lower = tag.toLowerCase();
    if (!ALLOWED_TAGS.has(lower)) return "";

    const allowed = ALLOWED_ATTRS[lower] ?? [];
    if (allowed.length === 0) {
      if (match.startsWith("</")) return `</${lower}>`;
      return `<${lower}${match.endsWith("/>") ? " /" : ""}>`;
    }

    const attrs = allowed.map((attr) => {
      const m = match.match(new RegExp(`${attr}="([^"]*)"`, "i"));
      if (!m) return "";
      const val = m[1].replace(/javascript:/gi, "");
      return `${attr}="${val}"`;
    }).filter(Boolean).join(" ");

    let extra = "";
    if (lower === "a") {
      const href = match.match(/href="([^"]*)"/i)?.[1] ?? "";
      extra = href.startsWith("/") ? "" : ' rel="noopener noreferrer" target="_blank"';
    }

    if (match.startsWith("</")) return `</${lower}>`;
    return `<${lower} ${attrs}${extra}${match.endsWith("/>") ? " /" : ""}>`;
  });

  return safe;
}
