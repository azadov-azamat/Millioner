package ai.ecma.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class MessageByLang {
    @Autowired
    MessageSource messageSource;

    public String getMessageByKey(String key){
        return messageSource.getMessage(key,null, LocaleContextHolder.getLocale());
    }
}
