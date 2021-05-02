package ai.ecma.demo.service;

import ai.ecma.demo.component.MessageByLang;
import ai.ecma.demo.entity.Questions;
import ai.ecma.demo.entity.User;
import ai.ecma.demo.entity.Variant;
import ai.ecma.demo.exceptions.ResourceNotFoundExceptions;
import ai.ecma.demo.payload.*;
import ai.ecma.demo.repository.QuestRepository;
import ai.ecma.demo.repository.RoleRepository;
import ai.ecma.demo.repository.UserRepository;
import ai.ecma.demo.repository.VariantRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class AuthService implements UserDetailsService {

    final
    UserRepository userRepository;

    final
    QuestRepository questRepository;

    final
    PasswordEncoder passwordEncoder;

    final
    RoleRepository roleRepository;

    final
    MessageByLang messageByLang;

    final
    VariantRepository variantRepository;

    @Value("${twilio.account_sid}")
    private String account_sid;

    @Value("${twilio.auth_token}")
    private String auth_token;

    public AuthService(UserRepository userRepository, QuestRepository questRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, MessageByLang messageByLang, VariantRepository variantRepository) {
        this.userRepository = userRepository;
        this.questRepository = questRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.messageByLang = messageByLang;
        this.variantRepository = variantRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

//======================= Question ======================================================

    public QuestDto getQuestion(Questions questions) {
        List<AnsDto> variantDtoList = new ArrayList<>();
        List<Variant> allByQuestionsId = variantRepository.findAllByQuestionsId(questions.getId());
        for (Variant variant : allByQuestionsId) {
            AnsDto ansDto = new AnsDto();
            ansDto.setId(variant.getId());
            ansDto.setCorrect(variant.isCorrect());
            ansDto.setTitle(variant.getTitle());
            variantDtoList.add(ansDto);
        }
        return new QuestDto(
                questions.getId(),
                questions.getName(),
                questions.getTitle(),
                variantDtoList
        );
    } // ===== GET ID

// Bu yerda savol qo`shilyabdi u bilan birga javob variantlar ham

    public ApiResponse addQuestions(SaveDto saveDto) {
        try {
            Questions questions = new Questions();
            questions.setName(saveDto.getQuestionName());
            questions.setTitle(saveDto.getQuestion());
            questions = questRepository.save(questions);

            List<Variant> variants = new ArrayList<>(4);
            List<String> vars = saveDto.getVars();
            for (int i = 0; i < vars.size(); i++) {
                Variant variant = new Variant(
                        vars.get(i),
                        i == Integer.parseInt(saveDto.getAnsTrue()),
                        questions
                );
                variants.add(variant);
            }
            variantRepository.saveAll(variants);

            return new ApiResponse(messageByLang.getMessageByKey("saved"), true);
        } catch (Exception e) {
            return new ApiResponse(messageByLang.getMessageByKey("noSaved"), false);
        }
    } // ===== ADD / POST


    public List<QuestDto> getQuestionAll() {
        List<QuestDto> collect = questRepository.findAll()
                .stream()
                .map(this::getQuestion)
                .collect(Collectors.toList());
        return collect;
    } // ===== GET ALL

    public ApiResponse editQuestionId(Questions questions, QuestDto questDto) {
        try {
            questions.setName(questDto.getQuestionName());
            questions.setTitle(questDto.getQuestion());
            return new ApiResponse(messageByLang.getMessageByKey("edit"), true);
        } catch (Exception e) {
            return new ApiResponse(messageByLang.getMessageByKey("edit.error"), false);
        }

    } // EDIT / PUT

    public ApiResponse deleteQuestion(UUID id) {
        try {
            questRepository.deleteById(id);
            return new ApiResponse(messageByLang.getMessageByKey("delete.question"), true);
        } catch (Exception e) {
            return new ApiResponse(messageByLang.getMessageByKey("objectNotFound"), false);
        }
    } // ===== DELETE

// ===================== ANSWERS ==========================================================

    public AnsDto getAnswer(Variant variant) {
        return new AnsDto(
                variant.getId(),
                variant.isCorrect(),
                variant.getTitle(),
                variant.getQuestions()
        );
    }

    public List<Variant> getAnswerAll(Questions questionId) {
        return variantRepository.findAllByQuestions(questionId);
    }

    public UserDetails getUserById(UUID id) {
        return (UserDetails) userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }
}