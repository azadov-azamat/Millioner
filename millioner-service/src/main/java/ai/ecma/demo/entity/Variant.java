package ai.ecma.demo.entity;

import ai.ecma.demo.entity.template.AbsNameEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Variant {

    @Id
    @Type(type = "org.hibernate.type.PostgresUUIDType")
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private boolean correct;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Questions questions;

    public Variant(String title, boolean correct, Questions questions) {
        this.title = title;
        this.correct = correct;
        this.questions = questions;
    }
}
