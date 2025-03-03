package net.javaguides.springboot.controller;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.TextItem;
import net.javaguides.springboot.repository.TextItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/textitems")
public class TextItemController {

    @Autowired
    private TextItemRepository textItemRepository;

    @GetMapping
    public List<TextItem> getAllTextItems() {
        return textItemRepository.findAll();
    }

    @PostMapping
    public TextItem createTextItem(@RequestBody TextItem textItem) {
        return textItemRepository.save(textItem);
    }

    @GetMapping("{id}")
    public ResponseEntity<TextItem> getTextItemById(@PathVariable long id) {
        TextItem textItem = textItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TextItem not exist with id:" + id));
        return ResponseEntity.ok(textItem);
    }

    @PutMapping("{id}")
    public ResponseEntity<TextItem> updateTextItem(@PathVariable long id, @RequestBody TextItem textItemDetails) {
        TextItem updatedTextItem = textItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TextItem not exist with id: " + id));

        updatedTextItem.setContent(textItemDetails.getContent());

        textItemRepository.save(updatedTextItem);

        return ResponseEntity.ok(updatedTextItem);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTextItem(@PathVariable long id) {
        TextItem textItem = textItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TextItem not exist with id: " + id));

        textItemRepository.delete(textItem);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
