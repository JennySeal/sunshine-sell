const FrontEnd_Dev_Url = ['http://localhost:3000']

const FrontEnd_Production_Url = ['https://www.sunshine-stores.net', 'https://sunshine-stores.net'];

module.exports = process.env.NODE_ENV === 'production' ? FrontEnd_Production_Url : FrontEnd_Dev_Url;
