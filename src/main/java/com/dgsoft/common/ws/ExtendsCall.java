package com.dgsoft.common.ws;

import org.jboss.seam.log.Logging;
import org.json.JSONException;
import org.json.JSONObject;
import org.richfaces.application.push.MessageException;
import org.richfaces.application.push.TopicKey;
import org.richfaces.application.push.TopicsContext;

import javax.ws.rs.*;

/**
 * Created by cooper on 9/26/16.
 */
@Path("/extends")
public class ExtendsCall {


    @POST
    @Path("/person/{key}")
    public String putPerson(@PathParam("key") String key , @FormParam("cer") String cer){



        Logging.getLog(this.getClass()).debug("receive person card data:" + cer);
        JSONObject contractJson;
        try {
            if (cer != null && !"".equals(cer.trim())){
                contractJson = new JSONObject(cer);
            }else{
                contractJson = new JSONObject();
            }
            contractJson.put("pushType","person");

            return pushMessage(key, contractJson.toString());
        } catch (JSONException e) {
            throw new IllegalArgumentException(e.getMessage(),e);
        }

    }

    private String pushMessage(String key,String cer) {
        TopicKey topicKey = new TopicKey(key);
        TopicsContext topicsContext = TopicsContext.lookup();
        try {
            topicsContext.publish(topicKey, cer);
            // topicsContext.removeTopic(topicKey);

            return "success";

        } catch (MessageException e) {
            topicsContext.removeTopic(topicKey);
            Logging.getLog(getClass()).debug(e.getMessage(),e);
            return "failed";
        }
    }

    @POST
    @Path("/finger/code/{key}")
    public String putFingerCode(@PathParam("key") String key , @FormParam("code") String code){

        Logging.getLog(this.getClass()).debug("receive FingerCode:" + code);
        JSONObject contractJson = new JSONObject();
        try {
            if (code != null && !"".equals(code.trim())){
                contractJson.put("fingerCode",code);

            }
            contractJson.put("pushType","finger");

            return pushMessage(key, contractJson.toString());
        } catch (JSONException e) {
            throw new IllegalArgumentException(e.getMessage(),e);
        }
    }

    @POST
    @Path("/finger/valid/{key}")
    public String validFingerCode(@PathParam("key") String key , @FormParam("img") String img){

        Logging.getLog(this.getClass()).debug("receive image:" + img);


        return pushMessage(key, img);

    }

}
