package ai.ecma.demo.projection;

import ai.ecma.demo.entity.Questions;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

@Projection(name = "Question", types = Questions.class)
public interface QuestProjection {
    UUID getId();

    String getQuestionName();

    String getQuestion();
}
