package ai.ecma.demo.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID userId;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String password;

    private String smsCode;


}
