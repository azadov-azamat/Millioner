package ai.ecma.demo.controller;

import ai.ecma.demo.entity.User;
import ai.ecma.demo.payload.ApiResponse;
import ai.ecma.demo.payload.ReqUser;
import ai.ecma.demo.payload.UserDto;
import ai.ecma.demo.security.JwtTokenProvider;
import ai.ecma.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserService userService;

    @PostMapping("/registerClient")
    private HttpEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        ApiResponse apiResponse = userService.registerClient(userDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PostMapping("/checkSmsCode")
    public HttpEntity<?> checkSmsCode(@RequestBody ReqUser reqUser) {
        ApiResponse apiResponse = userService.checkSmsCode(reqUser);
        if (apiResponse.isSuccess()) {
            return ResponseEntity.status(200).body(jwtTokenProvider.generateToken((User) apiResponse.getObject()));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiResponse);
    }
//    @PostMapping("/canselRegister")
//    public HttpEntity<?> canselRegister(@RequestBody ReqUser userId){
//        ApiResponse apiResponse = userService.canselRegister(userId);
//        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
//    }

}
