package com.dgsoft.faces.component;

import java.util.*;

/**
 * Created by cooper on 12/20/14.
 */
public class UISwitch extends javax.faces.component.UISelectBoolean {


    protected enum PropertyKeys {
        accesskey,
        dir,
        disabled,
        label,
        lang,
        readonly,
        style,
        styleClass,
        tabindex,
        title,
        onText,
        offText,
        labelText;


        String toString;

        PropertyKeys(String toString) {
            this.toString = toString;
        }

        PropertyKeys() {
        }

        public String toString() {
            return ((toString != null) ? toString : super.toString());
        }
    }


    /**
     * <p>Return the value of the <code>accesskey</code> property.</p>
     * <p>Contents: Access key that, when pressed, transfers focus
     * to this element.
     */
    public String getAccesskey() {
        return (String) getStateHelper().eval(PropertyKeys.accesskey);

    }

    /**
     * <p>Set the value of the <code>accesskey</code> property.</p>
     */
    public void setAccesskey(String accesskey) {
        getStateHelper().put(PropertyKeys.accesskey, accesskey);
    }


    /**
     * <p>Return the value of the <code>dir</code> property.</p>
     * <p>Contents: Direction indication for text that does not inherit directionality.
     * Valid values are "LTR" (left-to-right) and "RTL" (right-to-left).
     */
    public String getDir() {
        return (String) getStateHelper().eval(PropertyKeys.dir);

    }

    /**
     * <p>Set the value of the <code>dir</code> property.</p>
     */
    public void setDir(String dir) {
        getStateHelper().put(PropertyKeys.dir, dir);
    }


    /**
     * <p>Return the value of the <code>disabled</code> property.</p>
     * <p>Contents: Flag indicating that this element must never receive focus or
     * be included in a subsequent submit.  A value of false causes
     * no attribute to be rendered, while a value of true causes the
     * attribute to be rendered as disabled="disabled".
     */
    public boolean isDisabled() {
        return (Boolean) getStateHelper().eval(PropertyKeys.disabled, false);

    }

    /**
     * <p>Set the value of the <code>disabled</code> property.</p>
     */
    public void setDisabled(boolean disabled) {
        getStateHelper().put(PropertyKeys.disabled, disabled);
    }


    /**
     * <p>Return the value of the <code>label</code> property.</p>
     * <p>Contents: A localized user presentable name for this component.
     */
    public String getLabel() {
        return (String) getStateHelper().eval(PropertyKeys.label);

    }

    /**
     * <p>Set the value of the <code>label</code> property.</p>
     */
    public void setLabel(String label) {
        getStateHelper().put(PropertyKeys.label, label);
    }


    /**
     * <p>Return the value of the <code>lang</code> property.</p>
     * <p>Contents: Code describing the language used in the generated markup
     * for this component.
     */
    public String getLang() {
        return (String) getStateHelper().eval(PropertyKeys.lang);

    }

    /**
     * <p>Set the value of the <code>lang</code> property.</p>
     */
    public void setLang(String lang) {
        getStateHelper().put(PropertyKeys.lang, lang);
    }


    /**
     * <p>Return the value of the <code>readonly</code> property.</p>
     * <p>Contents: Flag indicating that this component will prohibit changes by
     * the user.  The element may receive focus unless it has also
     * been disabled.  A value of false causes
     * no attribute to be rendered, while a value of true causes the
     * attribute to be rendered as readonly="readonly".
     */
    public boolean isReadonly() {
        return (Boolean) getStateHelper().eval(PropertyKeys.readonly, false);

    }

    /**
     * <p>Set the value of the <code>readonly</code> property.</p>
     */
    public void setReadonly(boolean readonly) {
        getStateHelper().put(PropertyKeys.readonly, readonly);
    }


    /**
     * <p>Return the value of the <code>style</code> property.</p>
     * <p>Contents: CSS style(s) to be applied when this component is rendered.
     */
    public String getStyle() {
        return (String) getStateHelper().eval(PropertyKeys.style);

    }

    /**
     * <p>Set the value of the <code>style</code> property.</p>
     */
    public void setStyle(String style) {
        getStateHelper().put(PropertyKeys.style, style);
    }


    /**
     * <p>Return the value of the <code>styleClass</code> property.</p>
     * <p>Contents: Space-separated list of CSS style class(es) to be applied when
     * this element is rendered.  This value must be passed through
     * as the "class" attribute on generated markup.
     */
    public String getStyleClass() {
        return (String) getStateHelper().eval(PropertyKeys.styleClass);

    }

    /**
     * <p>Set the value of the <code>styleClass</code> property.</p>
     */
    public void setStyleClass(String styleClass) {
        getStateHelper().put(PropertyKeys.styleClass, styleClass);
    }


    /**
     * <p>Return the value of the <code>tabindex</code> property.</p>
     * <p>Contents: Position of this element in the tabbing order
     * for the current document.  This value must be
     * an integer between 0 and 32767.
     */
    public String getTabindex() {
        return (String) getStateHelper().eval(PropertyKeys.tabindex);

    }

    /**
     * <p>Set the value of the <code>tabindex</code> property.</p>
     */
    public void setTabindex(String tabindex) {
        getStateHelper().put(PropertyKeys.tabindex, tabindex);
    }


    /**
     * <p>Return the value of the <code>title</code> property.</p>
     * <p>Contents: Advisory title information about markup elements generated
     * for this component.
     */
    public String getTitle() {
        return (String) getStateHelper().eval(PropertyKeys.title);

    }

    /**
     * <p>Set the value of the <code>title</code> property.</p>
     */
    public void setTitle(String title) {
        getStateHelper().put(PropertyKeys.title, title);
    }
    //switch property



    private static final Collection<String> EVENT_NAMES = Collections.unmodifiableCollection(Arrays.asList("blur", "change", "click", "valueChange", "dblclick", "focus", "keydown", "keypress", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "select"));

    public Collection<String> getEventNames() {
        return EVENT_NAMES;
    }


    public String getDefaultEventName() {
        return "valueChange";
    }


    public String getOnText() {
        return (String) getStateHelper().eval(PropertyKeys.onText);
    }

    public void setOnText(String onText) {
        getStateHelper().put(PropertyKeys.onText,onText);
    }

    public String getOffText() {
        return (String) getStateHelper().eval(PropertyKeys.offText);
    }

    public void setOffText(String offText) {
        getStateHelper().put(PropertyKeys.offText,offText);
    }

    public String getLabelText() {
        return (String) getStateHelper().eval(PropertyKeys.labelText);
    }

    public void setLabelText(String labelText) {
        getStateHelper().put(PropertyKeys.labelText,labelText);
    }

    @Override
    public String getFamily() {

        return "com.dgsoft.faces.BootStrap";
    }




}
