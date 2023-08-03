function generateForm() {
    const fileCount = document.getElementById("file-count").value;
    const fileDetailsDiv = document.getElementById("file-details");
  
    let formHtml = "";
  
    for (let i = 0; i < fileCount; i++) {
      formHtml += `
        <h2>File ${i + 1}</h2>
        <label for="start-block-${i}">Enter index (start) block:</label>
        <input type="text" id="start-block-${i}">
  
        <label for="file-size-${i}">Enter size of file:</label>
        <input type="text" id="file-size-${i}">
  
        <label for="occupied-blocks-${i}">Enter number of blocks occupied:</label>
        <input type="text" id="occupied-blocks-${i}">
  
        <label for="file-blocks-${i}">Enter the blocks of the file (comma-separated):</label>
        <input type="text" id="file-blocks-${i}">
      `;
    }
  
    fileDetailsDiv.innerHTML = formHtml;
  }
  
  function allocateFile() {
    const fileCount = document.getElementById("file-count").value;
    let output = "";
  
    for (let i = 0; i < fileCount; i++) {
      const startBlock = document.getElementById(`start-block-${i}`).value;
      const fileSize = document.getElementById(`file-size-${i}`).value;
      const occupiedBlocks = document.getElementById(`occupied-blocks-${i}`).value;
      const fileBlocks = document.getElementById(`file-blocks-${i}`).value.split(",").map(block => parseInt(block));
  
      output += `File ${i + 1}: Index Block: ${startBlock}, Size: ${fileSize}, Occupied Blocks: ${occupiedBlocks}, Blocks: ${fileBlocks.join(", ")}<br>`;
    }
  
    document.getElementById("output").innerHTML = output;
  }
  