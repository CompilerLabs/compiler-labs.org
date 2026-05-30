export let json = {
    page: {
        left_links: "anvil_language",
        content: [
            {
                type: "header",
                data: "What Is Anvil?",
            },
            {
                type: "text",
                data: "Anvil is a custom ISA & VM that is designed to run anvil binary programs.",
            },
            {
                type: "header",
                data: "What Can It Do?"
            },
            {
                type: "text",
                data: "Anvil can do: Basic math, binary, flag & control flow operations. Allocate and deallocate memory. Read from and write to RAM. Load, store and delete files. Check during runtime whether or not pointers will cause a crash and handle them without stopping the program (this feature is toggleable for speed). Use Anvil contexts to run and debug other anvil contexts. Basic time related functions. And terminal IO."
            },
            {
                type: "header",
                data: "Terminology",
            },
            {
                type: "text",
                data: "There are a few concepts you need to be familiar with to understand how Anvil works:",
            },
            {
                type: "text",
                data: "1) Cells & Contexts",
            },
            {
                type: "text",
                data: "Cells are a 64-bit chunk of memory that acts exactly like a typical register in any ISA. Any type of data can be stored in it (ints, floats, pointers, etc.) as long as it fits in the 64-bit range. Every cell can be read from and written to. No exceptions.",
            },
            {
                type: "text",
                data: "Contexts are a group of a specific amount of cells. The first few have specific uses. Like the instruction pointer and some flags. All remaining cells in the context not specified for a particular purpose are simply general purpose registers for the programmer / compiler to decide what to do with. Currently, the amount of cells in a context is exactly 2^16 (which may become 2^8 in the future).",
            },
            {
                type: "text",
                data: "2) Buffers",
            },
            {
                type: "text",
                data: "Buffers in anvil are a pair of pointers that point to the very first byte and very last byte of a section of memory. They are 64-bit pointers and take up one cell each always. All Anvil instructions that require buffers MUST be given both pointers in order to function properly.",
            },
            {
                type: "header",
                data: "How Does The Interpreter Run?"
            },
            {
                type: "text",
                data: "Basically, the Anvil interpreter reads the context for the addresses for the current instruction you're trying to execute, parses the instruction, advances the instruction pointer to the next instruction and then executes the instruction. Bear in mind that \"advances the instruction pointer to the next instruction and then executes the instruction\" is intentionally ordered this way. The reason its done this way is because of a historical issue with jumping math."
            },
            {
                type: "text",
                data: "A cool thing you can do is call the interpreter for a sub-context in a nestable fashion. In other words, you can dissect, step through, or just plainly execute Anvil code with Anvil code."
            },
            {
                type: "header",
                data: "What Instructions Are Available For Use?"
            },
            {
                type: "text",
                data: "There are currently 21 instructions total. Which are all available for use. Check the links on the left of the screen for each individual instruction."
            }
        ]
    }
}
