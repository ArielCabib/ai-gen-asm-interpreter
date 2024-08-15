# README

This is the README file for the project.

## Installation

To install the project, follow these steps:

1. Clone the repository.
2. Run `npx tsc` to compile.
3. Run `npx ts-node src/server.ts` to start the server.

## Example Usage

Paste the following code and run:
```
MOV A 5
CMP A 6
JEQ EQUAL_LABEL
MOV C 10
JMP END
EQUAL_LABEL:
MOV C 20
END:
HLT
```
## Disclaimer

This project is totally experimental and should not be used in production. It is provided as a proof of concept and is not intended to be used for any serious purposes. It's also 90% AI generated, so it may not work as expected.