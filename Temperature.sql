CREATE TABLE TEMPERATURE( 
    ID BIGINT NOT NULL AUTO_INCREMENT, 
    CURRENT_TEMP FLOAT NOT NULL, 
    STATUS BOOLEAN NOT NULL, 
    TARGET_TEMP FLOAT NOT NULL, 
    TIMESTAMP BIGINT NOT NULL 
);
