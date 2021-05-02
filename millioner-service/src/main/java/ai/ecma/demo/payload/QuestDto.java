package ai.ecma.demo.payload;

import ai.ecma.demo.entity.Variant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestDto {

    private UUID id;

    private String questionName;

    private String question;

    private List<AnsDto> variantDtoList;

}
