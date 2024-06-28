const cron = require('node-cron');
const fsExtra = require('fs-extra');
cron.schedule('30 23 * * *', () => {
  console.log('Remove image every 23:30 PM daily');
  try{
      fsExtra.emptyDirSync('./image');
      console.log('Remove all file success!')
  }catch(err){
    console.error(err)
  }
},
{ 
    timezone: "Asia/Ho_Chi_Minh" 
}
);