package ai.ecma.demo.repository;

import ai.ecma.demo.entity.Questions;
import ai.ecma.demo.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RepositoryRestResource(path = "variant", excerptProjection = Variant.class)
public interface VariantRepository extends JpaRepository<Variant, UUID>{
    List<Variant> findAllByQuestions(Questions questions);

    List<Variant> findAllByQuestionsId(UUID questionId);

    // QUEST ID BUYICHA TOG'RI JAVOBNI OLISH
    Optional<Variant> findByQuestionsIdAndCorrectIsTrue(UUID questionId);

    boolean existsByIdAndCorrectTrue(UUID id);

    Variant findByQuestionsId(UUID questions_id);
}
