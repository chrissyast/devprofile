const Tuya = require('@tuya/tuya-connector-nodejs')
const { TuyaContext } = Tuya
// import axios from 'axios'
const clientId = "k4ygkuqvb249gy4xex4u"
const clientSecret = "d510d3390bb74759b4e5c0adcef3eb56"

const aboveBedTop = "bfb2e8e952b6596d6d9180"
const aboveBedBottom = "bf0c3f4816aa83f4e1p9yc"
const otherTop = "bff3e10624c7fd882abua2"
const otherBottom = "bfb0acaa52202bbe96bqrn"
const all_device_ids = [aboveBedTop, aboveBedBottom, otherTop, otherBottom]
const aboveBed = [aboveBedTop, aboveBedBottom]
const other = [otherTop, otherBottom]
const baseUrl = `https://openapi.tuyaeu.com`

// const axiosInstance = axios.create({
//   headers: {
//     common: {
//       "Access-Control-Allow-Origin": "https://iot.tuya.com",
//     }
//   }
// })

/* axiosInstance.interceptors.request.use(config => {
  // Add the users local time as a header
  console.log(config);
  debugger;
  return config
  // config.headers["Accept-Datetime"] = $time.nowLocal().format();
  // Add the users session ID as a header
  // config.headers["X-Request-ID"] = store.getters.getSessionId;
}); */

// axiosInstance.interceptors.response.use(response => {
//   console.log("response recieved")
//   console.log(response);
//   return response
// });


const context = new TuyaContext({
    baseUrl,
    accessKey: clientId,
    secretKey: clientSecret,
    // rpc: axiosInstance
})
 
 async function changeColour(value, device_ids=all_device_ids) {
  device_ids.forEach(async (device_id) => {
    console.log(value)
    console.log(device_id)  
    try {
      const res = await context.request({
        path: `/v1.0/iot-03/devices/${device_id}/commands`,
        method: 'POST',
        // body: {"commands":[{"code":"countdown_1","value":3000}]}
        body: {"commands":[{"code":"colour_data_v2", value }]}
      //   body: {"commands":
      //   [
      //     {"code":"bright_value_v2","value": value},
      //     {"code": "temp_value_v2", "value": 0}
      //   ]
      // }
      })
      console.log(res)
    } catch (e) {
      console.log("oops")
      console.log(e)
    }

  })
} 





module.exports = {
  changeColour
}