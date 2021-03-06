package com.dgsoft.house.sale.action;

import com.dgsoft.common.system.RunParam;
import com.dgsoft.developersale.DeveloperLogonInfo;
import com.dgsoft.developersale.LogonInfo;
import com.dgsoft.house.SaleType;
import com.dgsoft.house.sale.contract.ContractContextMap;
import com.dgsoft.house.sale.model.ContractTemplate;
import org.jboss.seam.Component;
import org.jboss.seam.ScopeType;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.faces.FacesMessages;
import org.jboss.seam.framework.EntityHome;
import org.jboss.seam.international.StatusMessage;
import org.jboss.seam.log.Logging;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by cooper on 9/14/15.
 */
@Name("contractTemplateHome")
public class ContractTemplateHome extends EntityHome<ContractTemplate> {


    private ContractContextMap contractContextMap;

    @In
    private FacesMessages facesMessages;

    @Override
    public ContractTemplate createInstance(){
        LogonInfo logonInfo = (LogonInfo) Component.getInstance("logonInfo", ScopeType.SESSION);

        if (logonInfo == null){
            Logging.getLog(getClass()).warn("create null ContractTemplate beacuse not longin info");
            return new ContractTemplate();
        }
        //Logging.getLog(getClass()).debug(logonInfo);
        return new ContractTemplate(logonInfo.getGroupCode());
    }

    public void initInstance(){
        super.initInstance();
        if (isIdDefined() && getInstance().getContext() != null && !getInstance().getContext().trim().equals("")){
            try {
                contractContextMap = new ContractContextMap(new JSONObject(getInstance().getContext()));
            } catch (JSONException e) {
                facesMessages.addFromResourceBundle(StatusMessage.Severity.WARN,"ContractTemplateFail");
                contractContextMap = new ContractContextMap();
            }

        }else{
            contractContextMap = new ContractContextMap();
        }
    }

    @Override
    public String persist(){
        getInstance().setContractVersion(getInstance().getType().getCurrentVersion());

        try {
            getInstance().setContext(contractContextMap.toJson().toString());
        } catch (JSONException e) {
            facesMessages.addFromResourceBundle(StatusMessage.Severity.ERROR, "ContractTemplateFail");
            return null;
        }

        return super.persist();
    }

    @Override
    public String update(){

        try {
            getInstance().setContext(contractContextMap.toJson().toString());
        } catch (JSONException e) {
            facesMessages.addFromResourceBundle(StatusMessage.Severity.ERROR, "ContractTemplateFail");
            return null;
        }
        return super.update();
    }

    public ContractContextMap getContractContextMap() {
        if (contractContextMap == null){
            getInstance();
        }
        return contractContextMap;
    }

    public void setContractTypeName(String value){
        if (value  == null || value.trim().equals("")){
            getInstance().setType(null);
        }
        getInstance().setType(SaleType.valueOf(value));
    }

    public String getContractTypeName(){
        if (getInstance().getType() == null){
            return null;
        }
        return getInstance().getType().name();
    }

    public String editTemplate(){

        return "template-contract-"  + RunParam.instance().getParamValue("CONTRACT_LOCATION") + getInstance().getType().getCurrentPatch();
    }
}
