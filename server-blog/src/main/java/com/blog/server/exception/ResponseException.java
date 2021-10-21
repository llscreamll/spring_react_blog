package com.blog.server.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@ControllerAdvice
public class ResponseException extends ResponseEntityExceptionHandler  {

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<AwesomeException> handleThereIsNoSuchUserException() {
        return new ResponseEntity<>(new AwesomeException("Not found"), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(LoginAndPasswordException.class)
    protected ResponseEntity<AwesomeException> handleLoginAndPasswordException() {
        return new ResponseEntity<>(new AwesomeException("Login or password not correct"), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(LoginOrEmailIsBusyException.class)
    protected ResponseEntity<AwesomeException> handleLoginIsBusyException() {
        return new ResponseEntity<>(new AwesomeException("login or email is busy"), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(BlogNotFoundException.class)
    protected ResponseEntity<AwesomeException> handleBlogNotFountException() {
        return new ResponseEntity<>(new AwesomeException("Blog not found"), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PictureFormatIsNotCorrectException.class)
    protected ResponseEntity<AwesomeException> handlePictureFormatIsNotCorrectException() {
        return new ResponseEntity<>(new AwesomeException("Picture format is not correct"), HttpStatus.NOT_FOUND);
    }








    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        BindingResult result = ex.getBindingResult();
        Map<String, String> errorMap = new HashMap<>();
        if (result.hasErrors()) {
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
        }

        if (result.hasErrors()) {
            List<ObjectError> errors = result.getAllErrors();
            errors.forEach(p ->{
                FieldError fieldError = (FieldError) p;
                logger.error("Data check failure : object{"+fieldError.getObjectName()+"},field{"+fieldError.getField()+
                        "},errorMessage{"+fieldError.getDefaultMessage()+"}");
            });
        }
        return new ResponseEntity<>(new AwesomeException(errorMap.toString()), HttpStatus.BAD_REQUEST);
    }




    private static class AwesomeException {
        private String message;

        public AwesomeException(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
