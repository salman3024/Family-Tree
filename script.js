// Data
const data = {
    "name": "John",
    "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "children": [
      {
        "name": "Jane",
        "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "children": [
          {
            "name": "John",
            "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          }
        ]
      }
    ]
  };
  
  const container = document.getElementById("treeContainer");
  const updateButton = document.getElementById("updateButton");
  
  updateButton.addEventListener("click", () => {
  renderTree(data);
  });
  
    function renderTree(data) {
    container.innerHTML = ''; // Clear any existing content
  
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 500);  // Adjust as needed
    svg.setAttribute("height", 300); // Adjust as needed
    container.appendChild(svg);
  
    // Basic layout parameters
    const nodeRadius = 20;
    const horizontalSpacing = 150;
    const verticalSpacing = 100;
  
    // Function to create a node (circle and text)
    function createNode(x, y, name) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x}, ${y})`);
  
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", nodeRadius);
    circle.setAttribute("fill", "lightsteelblue");
    circle.setAttribute("stroke", "steelblue");
    circle.setAttribute("stroke-width", "2");
    group.appendChild(circle);
  
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = name;
    group.appendChild(text);
  
    return group;
    }
  
    // Function to create a link (line) between two nodes
    function createLink(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#ccc");
    line.setAttribute("stroke-width", "2");
    return line;
    }
  
    // Render the root node (John)
    const rootX = 250; // Center horizontally
    const rootY = 50;
    const rootNode = createNode(rootX, rootY, data.name);
    svg.appendChild(rootNode);
  
    // Render the first child (Jane)
    if (data.children && data.children.length > 0) {
    const child1 = data.children[0];
    const child1X = rootX;
    const child1Y = rootY + verticalSpacing;
    const child1Node = createNode(child1X, child1Y, child1.name);
    svg.appendChild(child1Node);
  
      // Create a link from John to Jane
    const link1 = createLink(rootX, rootY + nodeRadius, child1X, child1Y - nodeRadius);
    svg.insertBefore(link1, rootNode);  // Insert link *before* node so it's behind
  
      // Render Jane's child (John)
    if (child1.children && child1.children.length > 0) {
    const grandchild = child1.children[0];
    const grandchildX = child1X;
    const grandchildY = child1Y + verticalSpacing;
    const grandchildNode = createNode(grandchildX, grandchildY, grandchild.name);
    svg.appendChild(grandchildNode);
  
        // Create a link from Jane to John
    const link2 = createLink(child1X, child1Y + nodeRadius, grandchildX, grandchildY - nodeRadius);
    svg.insertBefore(link2, child1Node);  //Insert the link before the child node
    }
    }
  }
