package ai.ecma.demo.payload;

import ai.ecma.demo.entity.Questions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaveDto {


    private String ansTrue;

    private String question;

    private String questionName;

    private List<String> vars;

//    public SaveDto(String ansTrue, String question, String questionName, List<String> vars) {
//        this.ansTrue = ansTrue;
//        this.question = question;
//        this.questionName = questionName;
//        this.vars = vars;
//    }
}
