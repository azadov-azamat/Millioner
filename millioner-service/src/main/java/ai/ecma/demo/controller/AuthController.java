package ai.ecma.demo.controller;

import ai.ecma.demo.component.MessageByLang;
import ai.ecma.demo.entity.Questions;
import ai.ecma.demo.entity.User;
import ai.ecma.demo.exceptions.ResourceNotFoundExceptions;
import ai.ecma.demo.payload.*;
import ai.ecma.demo.repository.QuestRepository;
import ai.ecma.demo.repository.UserRepository;
import ai.ecma.demo.repository.VariantRepository;
import ai.ecma.demo.security.CurrentUser;
import ai.ecma.demo.security.JwtTokenProvider;
import ai.ecma.demo.service.AuthService;
import ai.ecma.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    QuestRepository questRepository;

    @Autowired
    VariantRepository variantRepository;

    @Autowired
    AuthService authService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    MessageByLang messageByLang;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/userMe")
    public HttpEntity<?> getUserMe(@CurrentUser User user) {
        return ResponseEntity.ok(new ApiResponse(true, user));
    }


    @GetMapping("/allUsers")
    public HttpEntity<?> allUsersForAdmin(@CurrentUser User user) {
        List<User> clientList = userRepository.getUserListWithPageable("ROLE_CLIENT", 20, 10);
        return ResponseEntity.ok(clientList);
    }


    @PutMapping("/editUser/{userId}")
    public HttpEntity<?> editProfile(@RequestBody UserDto userDto, @CurrentUser User user) {
        ApiResponse apiResponse = userService.editProfile(userDto, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("deleteUserforAdmin/{userId}")
    public HttpEntity<?> deleteUserForAdmin(@PathVariable UUID userId) {
        return ResponseEntity.ok(userService.deleteUserForAdmin(userId));
    }

    @DeleteMapping("deleteUser/{userId}")
    public HttpEntity<?> deleteProfile(@RequestBody UserDto userDto, @PathVariable UUID uuid) {
        return ResponseEntity.ok(userService.deleteProfile(userDto, uuid));
    }

    @PostMapping("/checkSmsCodeDelete")
    public HttpEntity<?> checkSmsCode(@CurrentUser ReqUser user) {
        ApiResponse apiResponse = userService.checkSmsCode(user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PostMapping("/login")
    public HttpEntity<?> checkLogin(@RequestBody LoginDto loginDto) {
        try {
            Authentication loginAndParolSuccess = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getPhoneNumber(),
                            loginDto.getPassword()));
            User user = (User) loginAndParolSuccess.getPrincipal();
            String token = jwtTokenProvider.generateToken(user);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(401).body(new ApiResponse(messageByLang.getMessageByKey("login.error"), false));
    }

    @PostMapping("/addQuestions")
    public HttpEntity<?> addQuestions(@RequestBody SaveDto saveDto) {
        ApiResponse apiResponse = authService.addQuestions(saveDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }


    @GetMapping("/questionList") // ======== GET QUESTION
    public HttpEntity<?> getQuestionAll() {
        return ResponseEntity.ok(authService.getQuestionAll());
    }

    @GetMapping("/question/{questionId}") // ======== GET QUETION ID
    public HttpEntity<?> getQuestionsById(@PathVariable UUID questionId) {
        return ResponseEntity.ok(
                authService.getQuestion(questRepository.findById(questionId).orElseThrow(() ->
                        new ResourceNotFoundExceptions("Question not found", "id", questionId))));
    }

    @PutMapping("/editQuestion/{questionId}") // ====== EDIT QUESTION
    public HttpEntity<?> editQuestionId(@RequestBody QuestDto questDto, @CurrentUser Questions questions) {
        ApiResponse apiResponse = authService.editQuestionId(questions, questDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/deleteQuestion/{questionId}")
    public HttpEntity<?> deleteQuestionId(@PathVariable UUID id) {
        return ResponseEntity.ok(authService.deleteQuestion(id));
    }

// ======================= ANSWERS =====================================================================================


    @GetMapping("/answersList") // ======== GET ANSWERS LIST
    public HttpEntity<?> getAnswersAll( @RequestBody Questions questionId) {
        return ResponseEntity.ok(authService.getAnswerAll(questionId));
    }

    @GetMapping("/{asnwerId}") // ======== GET ANSWER ID
    public HttpEntity<?> getAnswerById(@PathVariable UUID answerId) {
        return ResponseEntity.ok(
                authService.getAnswer(variantRepository.findById(answerId).orElseThrow(() ->
                        new ResourceNotFoundExceptions("Question not found", "id", answerId))));
    }

//    @PostMapping("/addAnswer")  // ======= ADD ANSWER
//    public HttpEntity<?> addAnswer(@Valid @RequestBody AnsDto ansDto) {
//        ApiResponse apiResponse = authService.addAnswer(ansDto);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
//    }


//    @PutMapping("/editAnswer/{answerId}") // ====== EDIT ANSWERS
//    public HttpEntity<?> editAnswerId(@RequestBody AnsDto ansDto, @PathVariable UUID uuid) {
//        ApiResponse apiResponse = authService.editAnswerId(ansDto, uuid);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
//    }
//
//    @DeleteMapping("/deleteAnswer/{answerId}")
//    public HttpEntity<?> deleteAnswerId(@RequestBody AnsDto ansDto, @PathVariable UUID id) {
//        return ResponseEntity.ok(authService.deleteAnswer(ansDto, id));
//    }

    @GetMapping("/javobniTekshirish/{variantId}")
    public HttpEntity<?> getJavobniTekshirish(@PathVariable UUID variantningId){
        return ResponseEntity.ok(variantRepository.existsByIdAndCorrectTrue(variantningId));
    }
}
