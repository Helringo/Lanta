request = require("request");
module.exports.run = async (bot, message, args) => {
message.channel.send("Surely, please wait a moment");
    
    
    function randomIntFromInterval(min,max)	
{
    Math.floor(Math.random()*(max-min+1)+min);
}
	var waifArray = new Array();
	waifArray[0] = 'quiet_%28metal_gear%29';
	waifArray[1] = 'altera_%28fate%29';
	waifArray[2] = 'francis_drake_%28fate%29';
	waifArray[3] = 'miranda_lawson';
	waifArray[4] = 'liara_t%27soni';
	waifArray[5] = 'katarina_du_couteau';
	waifArray[6] = 'irelia';
	waifArray[7] = 'katalina_aryze';
  waifArray[8] = 'maya_%28borderlands%29';
  waifArray[9] = 'ciri';

let randowaif = Math.floor(Math.random() * 10);
let waiftag = waifArray[randowaif];
let waifurl = `https://danbooru.donmai.us/posts.json?random=true&limit=1&tags=${waiftag}`;
    
    
    request({
      url: waifurl,
      json: true
    }, function (err, temp, body) {
      if (!err && body.length > 0 && body[0].file_url) {
	  waifu = {
          image: { url: body[0].file_url },
          description: "Here you go~",
          color: 0x00B28C
        }
	message.channel.send("", { embed: waifu });
      } else {
        message.channel.send("I'm sorry, the camera is broken");
        console.log(err);
        console.log(body);
      }
});
}

module.exports.help = {
	name: "toniwaifu"
}
