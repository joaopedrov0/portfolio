// Saída real do arca (mastrien/arca), instalado com `cargo install` em um
// container descartável e usado com tarefas fictícias. Só as aspas dos
// argumentos foram acrescentadas, como seriam digitadas no terminal.
export const ARCA_SESSION = `$ arca add "Revisar o artigo do WorCAP"
$ arca add "Ler 20 páginas" --daily
$ arca add "Estudar ownership em Rust"
$ arca add "Responder e-mails" --daily

$ arca list
Cart
[0] Revisar o artigo do WorCAP
[1] Ler 20 páginas [DAILY]
[2] Estudar ownership em Rust
[3] Responder e-mails [DAILY]

Shelf
Empty

$ arca put-back 2
$ arca done 0
$ arca done 1

$ arca list --id
Cart
#1 Revisar o artigo do WorCAP  [DONE]
#2 Ler 20 páginas [DAILY] [DONE]
#4 Responder e-mails [DAILY]

Shelf
#3 Estudar ownership em Rust

$ arca check
Cart checked.

$ arca list
Cart
[0] Ler 20 páginas [DAILY]
[1] Responder e-mails [DAILY]

Shelf
[0] Estudar ownership em Rust

$ arca history
History
#1 2026-10-18 15:11:07:Revisar o artigo do WorCAP  [DONE]
#2 2026-10-18 15:11:07:Ler 20 páginas [DAILY] [DONE]`;
