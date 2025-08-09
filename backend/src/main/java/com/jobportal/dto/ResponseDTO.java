package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO {
	private String message;
	private Object data;
	
	public ResponseDTO(String message) {
		this.message = message;
	}
}
