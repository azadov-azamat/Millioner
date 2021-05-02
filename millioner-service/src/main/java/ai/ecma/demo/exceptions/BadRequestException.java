package ai.ecma.demo.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * BY SIROJIDDIN on 03.11.2020
 */

@EqualsAndHashCode(callSuper = true)
@Data
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String reason) {
        super(reason);
    }
}
