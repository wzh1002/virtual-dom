const setText = (node, content) => (
    node.setTextContent ? node.setTextContent = content : node.nodeValue = content
);

export default setText;
