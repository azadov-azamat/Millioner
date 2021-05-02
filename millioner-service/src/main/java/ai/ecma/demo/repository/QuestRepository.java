package ai.ecma.demo.repository;

import ai.ecma.demo.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

@RepositoryRestResource(path = "question", excerptProjection = Questions.class)
public interface QuestRepository extends JpaRepository<Questions, UUID> {
}
