// Camera Friend

importScripts('paper.js');

(async () => {
  // Get a canvas object for this paper.
  const canvas = await paper.get('canvas');

  // Draw "Hello world" on the canvas.
  // Get a "supporter canvas", which is a canvas for the entire
  // projection surface.
  const supporterCanvas = await paper.get('supporterCanvas');
  const supporterCtx = supporterCanvas.getContext('2d');

  // Get the paper number of this piece of paper (which should not change).
  const myPaperNumber = await paper.get('number');

  // Repeat every 100 milliseconds.
  setInterval(async () => {
    // Get a list of all the papers.
    const papers = await paper.get('papers');
    const camera = await paper.get('camera');

    // Clear out the supporter canvas. We get our own canvas, so we won't
    // interfere with other programs by doing this.
    supporterCtx.clearRect(0, 0, supporterCanvas.width, supporterCanvas.height);
    paper.drawFromCamera(supporterCtx, camera, papers["270"].points, papers['1142'].points);

    // Draw a circle in the center of our paper.
    const myCenter = papers[myPaperNumber].points.center;
    supporterCtx.fillStyle = supporterCtx.strokeStyle = 'rgb(0, 255, 255)';
    supporterCtx.beginPath();
    supporterCtx.arc(myCenter.x, myCenter.y, 10, 0, 2*Math.PI);
    supporterCtx.fill();

    // Draw a line from our paper to each other paper.
    Object.keys(papers).forEach(otherPaperNumber => {
      if (otherPaperNumber !== myPaperNumber) {
        const otherCenter = papers[otherPaperNumber].points.center;

        supporterCtx.beginPath();
        supporterCtx.moveTo(myCenter.x, myCenter.y);
        supporterCtx.lineTo(otherCenter.x, otherCenter.y);
        supporterCtx.stroke();
      }
    });
  }, 100);
})();
