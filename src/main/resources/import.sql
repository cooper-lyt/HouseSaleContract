INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('server_address','STRING','http://localhost:8080/HMPLAT/','产权服务器地址');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('allow_project_pledge_sale','STRING','no','在建工程房屋是否可签约 yes   no');

INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('saleInfoDataProviderURL','STRING','http://localhost:8080/HMPLAT/HouseSaleRecordDataProvider.seam','房屋销售数据提供URL');


INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('web_url','STRING','www.fcfcdjw.com','网站域名');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('web_name','STRING','辽宁省凤城房产登记网','网站名称');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('address','STRING','凤城市振兴街8号','地址');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('post_code','STRING','118100','邮编');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('tel','STRING','(0415)8122071','电话');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('e_mail','STRING','fc_fangchan@163.com','电邮');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('head_logo_url','IMG','http://localhost:8080/HouseSaleContract_SNAPSHOT/img/cms/sitelogo.png','网站主图标地址');
INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('foot_logo_url','IMG','http://localhost:8080/HouseSaleContract_SNAPSHOT/img/cms/housing_authority_footer_logo.png','网站脚图标地址');

INSERT CONTRACT.SYSTEM_PARAM(ID,TYPE, VALUE, DESCRIPTION) VALUES ('cms_mgr_password','STRING','KyCMS001','网站管理密码');


INSERT CONTRACT.ARTICLE_CATEGORY(ID,NAME,PRI,TYPE,DESCRIPTION) VALUES ('events','事件&通知',0,'Events','事件&通知');
INSERT CONTRACT.ARTICLE_CATEGORY(ID,NAME,PRI,TYPE,DESCRIPTION) VALUES ('welcome','Welcome',0,'Welcome','首页文章');
INSERT CONTRACT.ARTICLE(ID,MAIN_TITLE,SUMMARY,CATEGORY,PUBLISH_TIME,FIX_TOP,VIEW_TYPE) VALUES ('welcome','首页文章','请到网站管理中设置首页文章','welcome',now(),false,'TEXT');




