package ai.ecma.demo.service;

import ai.ecma.demo.component.MessageByLang;
import ai.ecma.demo.entity.Role;
import ai.ecma.demo.entity.User;
import ai.ecma.demo.entity.enums.RoleName;
import ai.ecma.demo.payload.ApiResponse;
import ai.ecma.demo.payload.ReqUser;
import ai.ecma.demo.payload.UserDto;
import ai.ecma.demo.repository.RoleRepository;
import ai.ecma.demo.repository.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MessageByLang messageByLang;

    @Value("${twilio.account_sid}")
    private String account_sid;

    @Value("${twilio.auth_token}")
    private String auth_token;


    public ApiResponse registerClient(UserDto userDto) {
        Role role = roleRepository.findByRoleName(RoleName.ROLE_CLIENT);
        Optional<User> optionalUser = userRepository.findByPhoneNumberAndRolesIn(userDto.getPhoneNumber(), Collections.singleton(role));
        User user = optionalUser.orElseGet(User::new);
        ApiResponse apiResponse = makePhoneNumberPattern(userDto.getPhoneNumber());
        if (apiResponse.isSuccess()) {
            String randomCodSms = getRandomNumberString();
            System.out.println("TasdiqLash hodingiz: ===>>> " + randomCodSms);
//            boolean success = sendVerifyToPhoneNumber(userDto.getPhoneNumber(), randomCodSms);
//            if (success) {
            if (!optionalUser.isPresent()) {
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                user.setPhoneNumber(userDto.getPhoneNumber());
                user.setRoles(Collections.singleton(role));
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            } else {
                return new ApiResponse(messageByLang.getMessageByKey("already"), false);
            }
            user.setSmsCode(randomCodSms);
            userRepository.save(user);
            return new ApiResponse("success", true, user);
//            }
//            return new ApiResponse(messageByLang.getMessageByKey("twilio.error"), false);
        }
        return new ApiResponse(messageByLang.getMessageByKey("already"), false);

    }

    public Object deleteUserForAdmin( UUID uuid) {
        Optional<User> optionalUser = userRepository.findById(uuid);
        if (!optionalUser.isPresent()) {
            return new ApiResponse(messageByLang.getMessageByKey("userNotFound"), false);
        } else {
            User user = optionalUser.get();
            userRepository.save(user);
        }
        return new ApiResponse(messageByLang.getMessageByKey("userNotFound"), false);
    }

    public ApiResponse editProfile(UserDto userDto, User user) {
        if (passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            if (makePhoneNumberPattern(user.getPhoneNumber()).isSuccess()) {
                user.setPhoneNumber(userDto.getPhoneNumber());
            }
            if (userDto.getPassword().length() < 6 || userDto.getPassword().length() > 16) {
                return new ApiResponse(messageByLang.getMessageByKey("password.format"), false);
            }
            user.setPassword(user.getPassword());
            userRepository.save(user);
            return new ApiResponse(messageByLang.getMessageByKey("edit"), true);
        } else {
            return new ApiResponse(messageByLang.getMessageByKey("password.error"), false);
        }
    }

    public Object deleteProfile(UserDto userDto, UUID uuid) {
        Optional<User> optionalUser = userRepository.findById(uuid);
        if (!optionalUser.isPresent()) {
            return new ApiResponse(messageByLang.getMessageByKey("userNotFound"), false);
        } else {
            String randomCodSms = getRandomNumberString();
//            boolean smsCode = sendVerifyToPhoneNumber(userDto.getPhoneNumber(), randomCodSms);
            System.out.println("TasdiqLash hodingiz:  " + randomCodSms);
            User user = optionalUser.get();
            user.setSmsCode(randomCodSms);
            userRepository.save(user);
        }
        return new ApiResponse(messageByLang.getMessageByKey("userNotFound"), false);
    }

// ================== Methods ====================================================================================

    public ApiResponse makePhoneNumberPattern(String phoneNumber) {
        if (phoneNumber != null) {
            phoneNumber = phoneNumber.startsWith("+") ? phoneNumber : "+" + phoneNumber;
            String regex = "^[+][9][9][8][0-9]{9}$";

            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(phoneNumber);

            if (matcher.matches()) {
                return new ApiResponse(true);
            } else {
                return new ApiResponse(messageByLang.getMessageByKey("phone.number.error"), false);
            }
        } else {
            return new ApiResponse(messageByLang.getMessageByKey("enter.phone"), false);
        }
    }

    public ApiResponse checkSmsCode(ReqUser reqUser) {
        Optional<User> optionalUser = userRepository.findById(reqUser.getUserId()); // oldin userning ID sini tekshiramiz
//        if (!optionalUser.isPresent()) { // agar USER bazada mavjud bo`lmasa
//            return new ApiResponse(messageByLang.getMessageByKey("already"), false);
//        }
        User user = optionalUser.get();
        if (user.getSmsCode().equals(reqUser.getSmsCode())) { // biz bergan sms, client jo`natgan sms bilan bir xilmi?
            user.setEnabled(true); // xa bir xil
            user.setSmsCode(null);
            userRepository.save(user);// ro`yxatdan muvoffaqqiyatli o`tdi!!! bazaga saqlaymiz
            return new ApiResponse(messageByLang.getMessageByKey("registration"), true, user);

        }
        return new ApiResponse(messageByLang.getMessageByKey("password.error"), false);
    }
//
//    public boolean sendVerifyToPhoneNumber(String phoneNumber, String randomCodSms) {
//        try {
//            Twilio.init(account_sid, auth_token);
//            Message message = Message.creator(
//                    new com.twilio.type.PhoneNumber(phoneNumber),
//                    new com.twilio.type.PhoneNumber("+14085338692"),
//                    messageByLang.getMessageByKey("register.message") + randomCodSms).create();
//            System.out.print(message.getSid());
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//
//    }

    private String getRandomNumberString() {
        Random random = new Random();
        int number = random.nextInt(999999);

        return String.format("%06d", number);
    }

    public List<User> allUsersForAdmin(User user) {
        List<User> all = userRepository.findAll();
        return (List<User>) new ApiResponse("Mana Senga Xamma userlar", true, all);
    }

}


