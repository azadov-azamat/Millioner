package ai.ecma.demo.projection;

import ai.ecma.demo.entity.Questions;
import ai.ecma.demo.entity.Variant;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

@Projection(name = "Variant", types = Variant.class)
public interface VariantProjection {
    UUID getId();

    String getTitle();

    boolean isCorrect();

    String getQuestionId();
}
