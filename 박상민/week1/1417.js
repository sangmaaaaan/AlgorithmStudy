// 1417.js

const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";

const input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);
// 입력받은 수를 배열로 만들기
const arr = input.slice(1).map(Number);
let cnt = 0;

//다솜이밖에 선출되지 않는 경우
if (N === 1) {
    console.log(0);
    return;
}

//여러명이 선거에 출마했을 경우
while (true) {
    let max = Math.max(...arr.slice(1)); // arr[0]을 제외한 최대값을 찾음
    if (arr[0] > max) break; // arr[0]이 최대값보다 크면 종료
    let maxIndex = arr.indexOf(max, 1); // arr[0]을 제외한 최대값의 인덱스를 찾음
    arr[maxIndex] -= 1;
    arr[0] += 1;
    cnt++;
}

console.log(cnt);