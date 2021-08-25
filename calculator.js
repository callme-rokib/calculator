let decimalAdded = false;

// Ambil smua keys dari document
const keys = document.querySelectorAll('#calculator span');
const input = document.querySelector('.screen');

// Ambil key operator matematika
const operatorMathematics = document.getElementsByClassName('operator');
const operators = Array.from(
  operatorMathematics,
  (mathematic) => mathematic.innerHTML
);

// Tambahkan event onclick ke semua kunci dan lakukan operasi
const calculator = Array.from(keys, (key) =>
  key.addEventListener('click', function (e) {
    // Mendapatkan nilai input dan tombol

    let inputVal = input.innerHTML;
    let btnVal = this.innerHTML;

    // Jika tombol hapus ditekan, hapus semuanya
    if (btnVal == 'AC') {
      input.innerHTML = '';
      decimalAdded = false;
    }

    // Jika tombol Ce di tekan, hapus satu karakter yang ada di depan kursor
    else if (btnVal == 'CE') {
      let output = input.innerHTML.toString();
      output = output.substr(0, output.length - 1);
      input.innerHTML = output;
      decimalAdded = false;
    }

    // Jika tombol dengan class eval ditekan, hitung dan tampilkan hasilnya
    else if (btnVal == '=') {
      let equation = input.innerHTML;
      let lastChar = equation[equation.length - 1];

      if (operators.indexOf(lastChar) > -1 || lastChar == '.')
        equation = equation.replace(/.$/, '');
      if (equation) input.innerHTML = eval(equation);

      decimalAdded = false;
    }

    // membuat event operator tidak boleh klik 2 kali atau operator tidak boleh sama secara bersamaan
    else if (operators.indexOf(btnVal) > -1) {
      // Jika operator di click
      // Albil karakter terakhir dari persamaan
      let lastChar = inputVal[inputVal.length - 1];

      // Tambahkan operator hanya jika input tidak kosong dan inputan terakhir bukan operator
      if (inputVal != '' && operators.indexOf(lastChar) == -1)
        input.innerHTML += btnVal;
      // Izinkan minus jika string kosong
      else if (inputVal == '' && btnVal == '-') input.innerHTML += btnVal;

      // Ganti operator terakhir (jika ada) dengan operator yang baru ditekan
      if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
        input.innerHTML = inputVal.replace(/.$/, btnVal);
      }

      decimalAdded = false;
    }

    //Jika tombol '.' di tekan
    else if (btnVal == '.') {
      if (!decimalAdded) {
        input.innerHTML += btnVal;
        decimalAdded = true;
      }
    }

    // jika ada tombol lain yang ditekan, tambahkan ke output / screen
    else {
      input.innerHTML += btnVal;
    }

    e.preventDefault();
  })
);
