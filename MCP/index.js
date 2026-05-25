    import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
    import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
    import {z} from 'zod'

    const server = new McpServer({
        name: "Weather Data Featcher",
        version: '1.0.0'
    })

    async function getWeatherByCity(city = ''){
        if(city.toLowerCase() === 'Aurangabad'){
            return {temp:'30C',forecase:'chances of heavy rain'}
        }
        if(city.toLowerCase() === 'Delhi'){
            return {temp:'47C',forecase:'chances of heavy sun'}
        }
        return {temp:null, error:'unable to get the data'}
    }

    server.tool('getWeatherDataByCityName',{
        city: z.string(),
    },async({city})=>{
        return {content: [{type:"text",text:JSON.stringify(getWeatherByCity(city))}] }
    })

    async function init(){
        const transport = new StdioServerTransport()
        await server.connect(transport)
    }

    init()