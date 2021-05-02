package ai.ecma.demo.payload;


import ai.ecma.demo.entity.Questions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class AnsDto {

    private UUID id;

    private boolean correct;

    private String title;

    private Questions questionId;

    public AnsDto(UUID id, boolean correct, String title) {
        this.id = id;
        this.correct = correct;
        this.title = title;
    }
    public AnsDto(UUID id, boolean correct, String title, Questions questionId) {
        this.id = id;
        this.correct = correct;
        this.title = title;
        this.questionId = questionId;
    }

}
