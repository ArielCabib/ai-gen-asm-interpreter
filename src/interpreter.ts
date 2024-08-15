class SimpleInterpreter {
  private code: string[];
  private registers: { [key: string]: number };
  private labels: { [key: string]: number };
  private instructionPointer: number;
  private cmpFlag: string | null;
  private running: boolean;

  constructor(code: string[]) {
      this.code = code;
      this.registers = {};
      this.labels = {};
      this.instructionPointer = 0;
      this.cmpFlag = null;
      this.running = true;
  }

  parseCode(): void {
      this.code.forEach((line, index) => {
          const parts = line.split(/\s+/);
          if (parts[0].endsWith(":")) {
              const label = parts[0].slice(0, -1);
              this.labels[label] = index;
          }
      });
  }

  fetchInstruction(): string {
      return this.code[this.instructionPointer];
  }

  executeInstruction(instruction: string): void {
      const parts = instruction.split(/\s+/);
      const cmd = parts[0];

      switch (cmd) {
          case "MOV":
              this.registers[parts[1]] = parseInt(parts[2], 10);
              break;

          case "ADD":
              this.registers[parts[1]] += parseInt(parts[2], 10);
              break;

          case "SUB":
              this.registers[parts[1]] -= parseInt(parts[2], 10);
              break;

          case "JMP":
              this.instructionPointer = this.labels[parts[1]];
              return;

          case "CMP":
              const reg = parts[1];
              const val = parseInt(parts[2], 10);
              if (this.registers[reg] === val) {
                  this.cmpFlag = "EQUAL";
              } else if (this.registers[reg] > val) {
                  this.cmpFlag = "GREATER";
              } else {
                  this.cmpFlag = "LESS";
              }
              break;

          case "JEQ":
              if (this.cmpFlag === "EQUAL") {
                  this.instructionPointer = this.labels[parts[1]];
                  return;
              }
              break;

          case "HLT":
              this.running = false;
              break;
      }
  }

  run(): { [key: string]: number } {
      this.parseCode();
      while (this.running && this.instructionPointer < this.code.length) {
          const instruction = this.fetchInstruction();
          
          this.executeInstruction(instruction);
          this.instructionPointer += 1;
      }
      return this.registers;
  }
}

export default SimpleInterpreter;