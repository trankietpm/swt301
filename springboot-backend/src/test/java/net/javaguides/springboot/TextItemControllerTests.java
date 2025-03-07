package net.javaguides.springboot;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import net.javaguides.springboot.controller.TextItemController;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.TextItem;
import net.javaguides.springboot.repository.TextItemRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class TextItemControllerTests {

	@Mock
	private TextItemRepository itemRepository;

	@InjectMocks
	private TextItemController controller;

	private TextItem item1, item2;

	@BeforeEach
	void setup() {
		item1 = new TextItem(1L, "Item 1");
		item2 = new TextItem(2L, "Item 2");
	}

	@Test
	void testCreateItem() {
		when(itemRepository.save(any(TextItem.class))).thenReturn(item1);
		TextItem newItem = controller.createTextItem(item1);
		assertEquals("Item 1", newItem.getContent());
	}

	@Test
	void testGetAllTextItems() {
		when(itemRepository.findAll()).thenReturn(Arrays.asList(item1, item2));
		List<TextItem> result = controller.getAllTextItems();
		assertEquals(2, result.size());
	}

	@Test
	void testFindItemId_Success() {
		when(itemRepository.findById(1L)).thenReturn(Optional.of(item1));
		ResponseEntity<TextItem> response = controller.getTextItemById(1L);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals("Item 1", response.getBody().getContent());
	}

	@Test
	void testFindItemId_NotFound() {
		when(itemRepository.findById(1L)).thenReturn(Optional.empty());
		assertThrows(ResourceNotFoundException.class, () -> controller.getTextItemById(1L));
	}

	@Test
	void testUpdateById_Fail() {
		when(itemRepository.findById(1L)).thenReturn(Optional.empty());
		assertThrows(ResourceNotFoundException.class, () -> controller.updateTextItem(1L, item1));
	}

	@Test
	void testUpdateById_Success() {
		TextItem newItem = new TextItem(1L, "Update item");
		when(itemRepository.findById(1L)).thenReturn(Optional.of(item1));
		when(itemRepository.save(any(TextItem.class))).thenReturn(newItem);
		ResponseEntity<TextItem> response = controller.updateTextItem(1L, newItem);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals("Update item", response.getBody().getContent());
	}

	@Test
	void testDeleteById_Success() {
		when(itemRepository.findById(1L)).thenReturn(Optional.of(item1));
		ResponseEntity<?> response = controller.deleteTextItem(1L);
		assertEquals(204, response.getStatusCodeValue());
		verify(itemRepository, times(1)).delete(item1);
	}

	@Test
	void testDeleteById_Fail() {
		when(itemRepository.findById(1L)).thenReturn(Optional.empty());
		assertThrows(ResourceNotFoundException.class, () -> controller.deleteTextItem(1L));
	}
}
