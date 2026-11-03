// Sample board in the Classic theme. Tokens: digit = given, e = your entry,
// x = wrong entry, n = pencil notes, . = empty.
(() => {
  const board = document.getElementById("board");
  if (!board) return;

  const rows = [
    "5 . . 6 4 . 2 . .",
    "9 . . 7 5 1 8 . 6",
    "4 . 6 . 9 . . . .",
    "7 9 1 8 . . 4 . 2",
    ". 5 . 2 e3 4 . 7 e1",
    "3 e4 2 e1 e7 9 5 6 8",
    ". x1 . . 8 n579 6 . 4",
    "2 . 4 9 1 3 . . 5",
    ". . 5 . 2 6 . . 9"
  ].map((r) => r.split(" "));

  const cells = [];
  rows.forEach((row, r) => row.forEach((tok, c) => {
    const b = document.createElement("button");
    b.type = "button";
    let value = "";
    if (tok[0] === "e") { b.classList.add("entry"); value = tok.slice(1); }
    else if (tok[0] === "x") { b.classList.add("err"); value = tok.slice(1); }
    else if (tok[0] === "n") {
      b.classList.add("notes");
      for (let d = 1; d <= 9; d++) {
        const s = document.createElement("span");
        s.textContent = tok.includes(String(d)) ? d : "";
        b.appendChild(s);
      }
    } else if (tok !== ".") value = tok;
    if (value) b.textContent = value;
    b.dataset.value = value;
    const kind = b.classList.contains("err") ? ", wrong" : b.classList.contains("entry") ? ", your entry" : value ? "" : ", empty";
    b.setAttribute("aria-label", `Row ${r + 1}, column ${c + 1}${value ? `: ${value}` : ""}${kind}`);
    b.addEventListener("click", () => select(r, c));
    cells.push({ b, r, c, value });
    board.appendChild(b);
  }));

  function select(r, c) {
    const box = (x, y) => Math.floor(x / 3) * 3 + Math.floor(y / 3);
    const chosen = cells[r * 9 + c];
    cells.forEach((cell) => {
      const isSel = cell.r === r && cell.c === c;
      const isPeer = !isSel && (cell.r === r || cell.c === c || box(cell.r, cell.c) === box(r, c));
      const isSame = !isSel && !isPeer && chosen.value && cell.value === chosen.value;
      cell.b.classList.toggle("sel", isSel && !cell.b.classList.contains("err"));
      cell.b.classList.toggle("peer", isPeer && !cell.b.classList.contains("err"));
      cell.b.classList.toggle("same", !!isSame && !cell.b.classList.contains("err"));
      cell.b.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
  }

  select(6, 5);
})();
