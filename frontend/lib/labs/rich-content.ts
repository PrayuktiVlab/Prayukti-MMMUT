
export const LAB_CONTENT: Record<string, { aim: string; theory: string; procedure: string }> = {
  // --- CN Labs ---
  "cn-exp-1": {
    aim: "To study and compare the OSI (Open Systems Interconnection) reference model and the TCP/IP (Transmission Control Protocol/Internet Protocol) model.",
    theory: `
      <div class="space-y-4">
        <p><strong>The OSI Model</strong> is a conceptual framework that standardizes the functions of a communication system into seven abstraction layers. Developed by ISO in 1984, it provides a universal set of rules for networking.</p>
        <p><strong>The TCP/IP Model</strong> is a more simplified and practical model used for the modern internet. It consists of four layers that map to the OSI model's seven layers.</p>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 class="font-bold text-blue-800 mb-2">Key Differences:</h4>
            <ul class="list-disc ml-6 space-y-1">
                <li>OSI is a generic, independent model; TCP/IP is based on standard protocols.</li>
                <li>OSI has 7 layers; TCP/IP has 4 layers.</li>
                <li>OSI provides a clear distinction between services, interfaces, and protocols.</li>
            </ul>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select the OSI vs TCP/IP simulation from the dashboard.</li>
        <li>Click on each layer of the OSI model to understand its functions and protocols.</li>
        <li>Observe the mapping between OSI layers and TCP/IP layers.</li>
        <li>Trigger the "Packet Flow" animation to see how data moves from the Application layer to the Physical layer.</li>
        <li>Review the comparison table and complete the quiz to verify your understanding.</li>
      </ol>
    `
  },
  "cn-exp-2": {
    aim: "To create a scenario and study the performance of CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol through simulation.",
    theory: `
      <div class="space-y-4">
        <p><strong>CSMA/CD</strong> is a media access control method used most notably in early Ethernet technology for local area networking.</p>
        <ul class="list-disc ml-6 space-y-1">
            <li><strong>Carrier Sense:</strong> A node listens to the channel before transmitting.</li>
            <li><strong>Multiple Access:</strong> Multiple nodes share the same physical medium.</li>
            <li><strong>Collision Detection:</strong> If two nodes transmit simultaneously, a collision occurs. Nodes detect this by monitoring signal voltage levels.</li>
        </ul>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 class="font-bold text-blue-800 mb-2">Backoff Algorithm:</h4>
            <p>After a collision, nodes wait for a random amount of time before retransmitting. The <strong>Binary Exponential Backoff</strong> algorithm is used to determine this wait time, reducing the probability of another collision.</p>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Enter the CSMA/CD simulation workbench.</li>
        <li>Configure the number of nodes, packet size, and transmission probability.</li>
        <li>Start the simulation and observe how nodes sense the carrier.</li>
        <li>Watch for collisions when multiple nodes transmit simultaneously.</li>
        <li>Observe the jamming signal and the backoff timers.</li>
        <li>Analyze the throughput and collision statistics in the results section.</li>
      </ol>
    `
  },
  "cn-exp-3": {
    aim: "To create a scenario and study the performance of Token Bus and Token Ring protocols through simulation.",
    theory: `
      <div class="space-y-4">
        <p><strong>Token-based protocols</strong> are collision-free medium access control (MAC) methods that regulate access to a shared channel using a control frame called a <strong>Token</strong>.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <h4 class="font-bold text-indigo-800 mb-1">Token Ring (IEEE 802.5)</h4>
                <p class="text-xs">Nodes are physically connected in a ring. The token circulates in one direction. A node captures the token to transmit and releases it after the frame returns (source stripping).</p>
            </div>
            <div class="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <h4 class="font-bold text-amber-800 mb-1">Token Bus (IEEE 802.4)</h4>
                <p class="text-xs">Nodes are on a physical bus but form a <strong>logical ring</strong>. The token is passed based on descending node addresses. It combines the physical robustness of a bus with the deterministic nature of a ring.</p>
            </div>
        </div>
        <p>These protocols provide <strong>deterministic access</strong>, meaning a node is guaranteed to get a turn to transmit within a predictable time frame, making them ideal for real-time applications.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select the protocol mode: <strong>Token Bus</strong> or <strong>Token Ring</strong> from the lab interface.</li>
        <li>Set the <strong>Number of Nodes</strong> and <strong>Packet Size</strong> for the transmission.</li>
        <li>Observe the <strong>Token Circulation</strong>:
            <ul class="list-disc ml-6 mt-1 opacity-80">
                <li>In Token Ring, see it move physically around the circle.</li>
                <li>In Token Bus, see it jump between nodes in logical order.</li>
            </ul>
        </li>
        <li>Trigger a transmission and follow the <strong>Data Frame</strong> as it travels across the network.</li>
        <li>Monitor the <strong>Throughput</strong> and <strong>Fairness</strong> metrics as multiple nodes compete for access.</li>
        <li>Complete the quiz to evaluate your understanding of predictable network delays.</li>
      </ol>
    `
  },
  "cn-exp-4": {
    aim: "To study and analyze the performance of various flow control protocols: Stop & Wait, Go-Back-N, and Selective Repeat.",
    theory: `
      <div class="space-y-4">
        <p><strong>Sliding Window Protocols</strong> are data link layer protocols used for reliable and sequential delivery of data frames. They provide <strong>Flow Control</strong> to ensure a fast sender doesn't overwhelm a slow receiver.</p>
        <div class="space-y-4">
            <div class="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <h4 class="font-bold text-blue-800 mb-1">Stop & Wait ARQ</h4>
                <p class="text-xs">The sender sends one frame and waits for an acknowledgment (ACK) before sending the next. It is simple but inefficient due to high waiting time.</p>
            </div>
            <div class="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <h4 class="font-bold text-indigo-800 mb-1">Go-Back-N (GBN)</h4>
                <p class="text-xs">Sender can send multiple frames (up to window size 'N') without waiting for ACKs. If a frame is lost, the sender retransmits ALL frames from the lost one onwards. Uses <strong>Cumulative ACKs</strong>.</p>
            </div>
            <div class="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                <h4 class="font-bold text-emerald-800 mb-1">Selective Repeat (SR)</h4>
                <p class="text-xs">Similar to GBN, but ONLY the lost frame is retransmitted. The receiver buffers out-of-order frames. It is more efficient but requires more complex logic at both ends.</p>
            </div>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select the Protocol: <strong>Stop & Wait</strong>, <strong>GBN</strong>, or <strong>Selective Repeat</strong>.</li>
        <li>Set the <strong>Window Size</strong> and <strong>Timeout</strong> values.</li>
        <li>Start the simulation and observe the sequence numbers of transmitted packets.</li>
        <li>Use the <strong>Manual Error Injection</strong> buttons to simulate a "Lost Packet" or "Lost ACK".</li>
        <li>Observe the retransmission behavior (Does it resend one packet or the whole window?).</li>
        <li>Analyze the <strong>Efficiency</strong> and <strong>Throughput</strong> graphs to compare the three methods.</li>
      </ol>
    `
  },

  // --- DLD Labs ---
  "dld-exp-1": {
    aim: "To design and verify the truth tables of basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) using 74xx family ICs.",
    theory: `
      <div class="space-y-4">
        <p><strong>Logic Gates</strong> are the fundamental building blocks of digital circuits. They perform basic logical operations.</p>
        <ul class="list-disc ml-6 mt-2 space-y-1">
          <li><strong>AND Gate (7408):</strong> Output is HIGH only if all inputs are HIGH.</li>
          <li><strong>OR Gate (7432):</strong> Output is HIGH if at least one input is HIGH.</li>
          <li><strong>NOT Gate (7404):</strong> Output is the complement of the input.</li>
          <li><strong>NAND Gate (7400):</strong> Compliment of AND. Universal gate.</li>
          <li><strong>NOR Gate (7402):</strong> Compliment of OR. Universal gate.</li>
          <li><strong>XOR Gate (7486):</strong> Output is HIGH if inputs are different.</li>
          <li><strong>XNOR Gate (74266):</strong> Output is HIGH if inputs are same.</li>
        </ul>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select the desired logic gate from the component toolbar.</li>
        <li>Connect input switches to the gate inputs.</li>
        <li>Connect the gate output to an LED or Output probe.</li>
        <li>Toggle the switches to apply different input combinations (0 and 1).</li>
        <li>Observe the output and verify based on the truth table.</li>
      </ol>
    `
  },
  "dld-exp-2": {
    aim: "To design and verify the truth table of Half Adder and Full Adder using 74xx family ICs.",
    theory: `
      <div class="space-y-4">
        <p><strong>Adders</strong> are combinational circuits used for binary addition.</p>
        <div class="bg-gray-50 p-4 rounded border">
            <h4 class="font-bold">Half Adder</h4>
            <p>Adds two single binary digits. Has two outputs: Sum (S) and Carry (C).</p>
            <p>S = A ⊕ B, C = A • B</p>
        </div>
        <div class="bg-gray-50 p-4 rounded border">
            <h4 class="font-bold">Full Adder</h4>
            <p>Adds three binary digits (A, B, Cin). Has two outputs: Sum (S) and Carry (Cout).</p>
            <p>S = A ⊕ B ⊕ Cin, Cout = (A • B) + (Cin • (A ⊕ B))</p>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Half Adder:</strong> Connect one XOR gate and one AND gate as per the circuit diagram. Verify inputs and outputs.</li>
        <li><strong>Full Adder:</strong> Use two Half Adders and an OR gate, or implement using basic gates.</li>
        <li>Apply all combinations of inputs and check the Sum and Carry LEDs.</li>
      </ol>
    `
  },
  "dld-exp-3": {
    aim: "To design and verify the truth table of Half Subtractor and Full Subtractor using 74xx family ICs.",
    theory: `
      <div class="space-y-4">
        <p><strong>Subtractors</strong> are used for binary subtraction.</p>
        <div class="bg-gray-50 p-4 rounded border">
            <h4 class="font-bold">Half Subtractor</h4>
            <p>Subtracts two bits. Outputs: Difference (D) and Borrow (Bo).</p>
            <p>D = A ⊕ B, Bo = A' • B</p>
        </div>
        <div class="bg-gray-50 p-4 rounded border">
            <h4 class="font-bold">Full Subtractor</h4>
            <p>Subtracts three bits (A, B, Bin). Outputs: Difference (D) and Borrow (Bout).</p>
            <p>D = A ⊕ B ⊕ Bin</p>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Half Subtractor:</strong> Connect inputs to XOR (Diff) and NOT+AND (Borrow).</li>
        <li><strong>Full Subtractor:</strong> Implement using two Half Subtractors and an OR gate.</li>
        <li>Verify the truth table by toggling inputs.</li>
      </ol>
    `
  },
  "dld-exp-4": {
    aim: "To perform code conversion: Binary to Gray and Gray to Binary.",
    theory: `
      <div class="space-y-4">
        <p><strong>Code Converters</strong> translate one binary code format to another.</p>
        <p><strong>Binary to Gray:</strong> G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0.</p>
        <p><strong>Gray to Binary:</strong> B3=G3, B2=B3⊕G2, B1=B2⊕G1, B0=B1⊕G0.</p>
        <p>Gray codes are used to prevent spurious output in switches and counters.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Construct the circuit using XOR gates (7486).</li>
        <li>For Binary to Gray: Connect binary inputs to XOR gates as per logic.</li>
        <li>For Gray to Binary: Connect gray code inputs to XOR gates.</li>
        <li>Apply 4-bit numbers and observe the converted output.</li>
      </ol>
    `
  },
  "dld-exp-5": {
    aim: "To design combinational logic circuits in SOP and POS forms and verify their truth tables.",
    theory: `
      <div class="space-y-4">
        <p><strong>Canonical Forms:</strong> Boolean functions can be expressed in standard forms.</p>
        <ul class="list-disc ml-6">
            <li><strong>SOP (Sum of Products):</strong> OR of AND terms (Minterms). Implemented using AND-OR logic or NAND-NAND logic.</li>
            <li><strong>POS (Product of Sums):</strong> AND of OR terms (Maxterms). Implemented using OR-AND logic or NOR-NOR logic.</li>
        </ul>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Derive the boolean expression from the given truth table or problem statement.</li>
        <li>Simplify using K-Map if necessary.</li>
        <li>Implement the circuit using basic gates (AND, OR, NOT) or Universal Gates (NAND/NOR).</li>
        <li>Verify the output against the truth table.</li>
      </ol>
    `
  },
  "dld-exp-6": {
    aim: "Realization of 2:4 Decoder and 4:2 Encoder circuit and verification of truth table.",
    theory: `
      <div class="space-y-4">
        <p><strong>Decoder (74139/74138):</strong> A logic circuit that converts n input lines to 2^n output lines. Used for address decoding.</p>
        <p><strong>Encoder (74147/74148):</strong> A circuit that converts 2^n input lines to n output lines. Used in keyboards and interrupts.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Decoder:</strong> Connect two inputs and enable line. Check which of the 4 outputs goes active (High/Low) based on input combination.</li>
        <li><strong>Encoder:</strong> Connect 4 inputs. Only one should be active at a time. Observe the 2-bit binary code at output.</li>
      </ol>
    `
  },
  "dld-exp-7": {
    aim: "To design and verify the truth table of Multiplexer and Demultiplexer circuits.",
    theory: `
      <div class="space-y-4">
        <p><strong>Multiplexer (74151/74153):</strong> "Many to One". Selects one of many input signals and sends it to the output. Controlled by Select lines.</p>
        <p><strong>Demultiplexer (74155/74138):</strong> "One to Many". Takes one input and steers it to one of many outputs based on Select lines.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>Mux (4:1):</strong> Connect 4 data inputs and 2 select lines. Change select lines to pass specific data input to output.</li>
        <li><strong>Demux (1:4):</strong> Connect 1 data input and 2 select lines. verify data appears on selected output line.</li>
      </ol>
    `
  },
  "dld-exp-8": {
    aim: "To design a 1-bit comparator and study the performance of 4-bit comparator IC 7485.",
    theory: `
      <div class="space-y-4">
        <p><strong>Comparator:</strong> Compares two binary numbers (A and B) and determines their relationship.</p>
        <ul class="list-disc ml-6">
            <li>Outputs: A > B, A < B, A = B</li>
        </ul>
        <p>IC 7485 is a 4-bit magnitude comparator.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li><strong>1-bit Comparator:</strong> Design using XOR, AND, NOT gates.</li>
        <li><strong>4-bit Comparator:</strong> Use the IC 7485 block. Apply two 4-bit numbers. Observe the status of Greater, Lesser, and Equal outputs.</li>
      </ol>
    `
  },
  "dld-exp-9": {
    aim: "Design and verification of basic Flip-Flops (SR, JK, D, T) and Shift Registers.",
    theory: `
      <div class="space-y-4">
        <p><strong>Flip-Flops</strong> are 1-bit memory elements.</p>
        <ul class="list-disc ml-6 space-y-1">
            <li><strong>SR FF:</strong> Basic Set-Reset. Invalid state when S=R=1.</li>
            <li><strong>JK FF (7476):</strong> Eliminates invalid state. Toggles when J=K=1.</li>
            <li><strong>D FF (7474):</strong> Data latch. Output follows input on clock edge.</li>
        </ul>
        <p><strong>Shift Registers (74194/74164):</strong> Used for data storage and movement (SISO, SIPO, PISO, PIPO).</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select a Flip-Flop type. Connect inputs and Clock.</li>
        <li>Verify state transitions on clock pulses.</li>
        <li>Connect multiple FFs to form a Shift Register. Shift data through the chain step-by-step.</li>
      </ol>
    `
  },
  "dld-exp-10": {
    aim: "To realize and verify the truth table of Asynchronous and Synchronous counters.",
    theory: `
      <div class="space-y-4">
        <p><strong>Counters</strong> are sequential circuits that go through a prescribed sequence of states.</p>
        <ul class="list-disc ml-6">
            <li><strong>Asynchronous (Ripple):</strong> Flip-flops are not clocked simultaneously. Simple but slower.</li>
            <li><strong>Synchronous:</strong> All flip-flops clocked together. Faster and glitch-free.</li>
        </ul>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Connect JK Flip-Flops in toggle mode.</li>
        <li><strong>Asynchronous:</strong> Output of one FF drives clock of next.</li>
        <li><strong>Synchronous:</strong> Clock is common. Logic gates control J,K inputs used for counting sequence.</li>
        <li>Reset the counter and apply clock pulses. Observe the binary count sequence.</li>
      </ol>
    `
  },


  // --- OOPS Labs ---
  "oops-exp-1": {
    aim: "To understand the basic concepts of classes and objects in Object-Oriented Programming.",
    theory: `
      <div class="space-y-4">
        <p><strong>Class</strong> is a blueprint or template for creating objects. It defines a set of attributes and methods that the created objects will have.</p>
        <p><strong>Object</strong> is an instance of a class. It is a real-world entity that has state and behavior.</p>
        <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 class="font-bold text-purple-800 mb-2">Key Concepts:</h4>
            <ul class="list-disc ml-6 space-y-1">
                <li>Classes provide the structure.</li>
                <li>Objects provide the data.</li>
                <li>Method define the behavior.</li>
            </ul>
        </div>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Select the Classes and Objects simulation.</li>
        <li>Define a class with properties and methods.</li>
        <li>Instantiate objects using the class.</li>
        <li>Interact with the objects to see how state changes.</li>
      </ol>
    `
  },
  "oops-exp-2": {
    aim: "To implement Inheritance in Java.",
    theory: "<p>Inheritance allows a class to acquire properties and methods of another class.</p>",
    procedure: "<ol><li>Create a Parent class.</li><li>Create a Child class extending Parent.</li></ol>"
  },
  "oops-exp-3": {
    aim: "To demonstrate Polymorphism.",
    theory: "<p>Polymorphism allows objects to be treated as instances of their parent class.</p>",
    procedure: "<ol><li>Implement method overriding.</li><li>Implement method overloading.</li></ol>"
  },
  "oops-exp-4": {
    aim: "To implement Data Encapsulation and Abstraction.",
    theory: "<p>Encapsulation hides data, Abstraction hides complexity.</p>",
    procedure: "<ol><li>Use private access modifiers.</li><li>Use abstract classes or interfaces.</li></ol>"
  },


  // --- DBMS Labs ---
  "dbms-exp-1": {
    aim: "To perform basic DDL and DML operations.",
    theory: "<p>SQL (Structured Query Language) is used to manage relational databases.</p>",
    procedure: "<ol><li>Create a table using CREATE command.</li><li>Insert data using INSERT command.</li><li>Retrieve data using SELECT.</li></ol>"
  },
  "dbms-exp-2": {
    aim: "To build a database application for Store Management.",
    theory: "<p>Database applications interface with the DBMS to perform useful tasks.</p>",
    procedure: "<ol><li>Design the schema.</li><li>Implement the application logic.</li></ol>"
  },
  "dbms-exp-3": {
    aim: "To perform advanced SQL queries using Joins, Subqueries, Triggers, and Views.",
    theory: "<p>Advanced SQL allows for complex data retrieval and manipulation.</p>",
    procedure: "<ol><li>Write specific queries to solve problems.</li><li>Create Views for simplified access.</li></ol>"
  },
  "dbms-exp-4": {
    aim: "To analyze and decompose schemas for Normalization (1NF to 5NF).",
    theory: "<p>Normalization reduces data redundancy and improves data integrity.</p>",
    procedure: "<ol><li>Analyze functional dependencies.</li><li>Decompose tables into normal forms.</li></ol>"
  },
  "dbms-exp-5": {
    aim: "To implement Host Language Interface.",
    theory: "<p>Embedding SQL in high-level programming languages.</p>",
    procedure: "<ol><li>Connect to database from Java/Python.</li><li>Execute queries appropriately.</li></ol>"
  }
};
