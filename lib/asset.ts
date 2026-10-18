// Prefixo do site quando publicado em subcaminho (GitHub Pages: /portfolio).
// O next/link aplica o basePath sozinho; imagens e links comuns para arquivos de public/ não.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string) {
  return path.startsWith('/') ? `${basePath}${path}` : path;
}
