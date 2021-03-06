package com.dgsoft.house.sale;

import com.dgsoft.common.system.DictionaryService;
import com.dgsoft.common.system.RunParam;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Unwrap;


/**
 * Created by cooper on 9/18/15.
 */

@Name("dictionary")
public class Dictionary {

    private final static DictionaryService dictionaryService = new DictionaryService(){

        @Override
        protected String getWsdlLocation() {

            return RunParam.instance().getParamValue("server_address") + "DictionaryWS?wsdl";
        }
    };


    @Unwrap
    public DictionaryService getDictionaryService(){
        return dictionaryService;
    }


}
