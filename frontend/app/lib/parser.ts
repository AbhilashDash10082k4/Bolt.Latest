    /*<boltAction type="file" filePath="src/App.tsx">
        import React from 'react';
        import Feed from './Components/Feed';
        import Navbar from './Components/Navbar';

        function App() {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <Feed />
            </div>
        );
        }

        export default App;
    </boltAction>
    </boltArtifact>
*/
// const parsedData =[{
//     type: StepType.CreateFile,
//     status: 'pending',
//     code: "import React from 'react';
//     import Feed from './Components/Feed';
//     import Navbar from './Components/Navbar';

//     function App() {
//       return (
//         <div className="min-h-screen bg-gray-100 flex flex-col">
//           <Navbar />
//           <Feed />
//         </div>
//       );
//     }

//     export default App;",
//     title: "Create App.tsx",

// }]
import { Step, StepType } from "./types";

export function parseXml(response: string): Step[] {
    // Extract the XML content between <boltArtifact> tags
    const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
    
    if (!xmlMatch) {
      return [];
    }
    // console.log("xmlMatch ",xmlMatch)
    const xmlContent = xmlMatch[1];
    // console.log("xmlContent ",xmlContent);
    const steps: Step[] = [];
    let stepId = 1;
  
    // Extract artifact title
    const titleMatch = response.match(/title="([^"]*)"/);
    // console.log("titleMatch ",titleMatch)
    const artifactTitle = titleMatch ? titleMatch[1] : 'Project Files';
  
    // Add initial artifact step
    steps.push({
      id: stepId++,
      title: artifactTitle,
      description: '',
      type: StepType.CreateFolder,
      status: 'pending'
    });
  
    // Regular expression to find boltAction elements
    const actionRegex = /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;
    
    let match;
    // console.log("execXML ",execXML);
    while ((match = actionRegex.exec(xmlContent)) !== null) {
      const [, type, filePath, content] = match;
  
      if (type === 'file') {
        // File creation step
        steps.push({
          id: stepId++,
          title: `Create ${filePath || 'file'}`,
          description: '',
          type: StepType.CreateFile,
          status: 'pending',
          code: content.trim(),
          path: filePath
        });
      } else if (type === 'shell') {
        // Shell command step
        steps.push({
          id: stepId++,
          title: 'Run command',
          description: '',
          type: StepType.RunScript,
          status: 'pending',
          code: content.trim()
        });
      }
    }
  
    return steps;
  }