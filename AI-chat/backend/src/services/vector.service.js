// Import the Pinecone library
const {Pinecone } =require('@pinecone-database/pinecone');

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.Pinecone_API_KEY });

const cohortChatGptIndex=pc.index("cohort-chat-gpt");

async function createMemory ({vectors,metadata,messageId}){
 await cohortChatGptIndex.upsert([{
     id:messageId,
     values:vectors,
     metadata
 }])
}

async function queryMemory ({queryVector,limit=5,metadata}){
    const result=await cohortChatGptIndex.query({
        vector:queryVector,
        topK:limit,
        filter:metadata?metadata:undefined,
        includeMetadata:true
    })
    return result.matches
}

module.exports={
    createMemory,
    queryMemory
}