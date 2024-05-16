package com.example.bugtrackersystem.controllers;

import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.bugtrackersystem.entity.Bug;
import com.example.bugtrackersystem.entity.SprintManager;
import com.example.bugtrackersystem.repository.BugRepository;
import com.example.bugtrackersystem.repository.SprintRepository;

@WebMvcTest(SprintController.class)
public class SprintControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SprintRepository sprintRepository;

    @MockBean
    private BugRepository bugRepository;

    @InjectMocks
    private SprintController sprintController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(sprintController).build();
    }

    @Test
    public void testGetCurrentSprintSuccess() throws Exception {
        SprintManager sprintManager = new SprintManager();
        sprintManager.setSprint("1");
        sprintManager.setCurrentSprint(true);

        when(sprintRepository.findByCurrentSprint(true)).thenReturn(sprintManager);

        mockMvc.perform(get("/sprint/current"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetCurrentSprintInternalServerError() throws Exception {
        when(sprintRepository.findByCurrentSprint(true)).thenThrow(new RuntimeException("Exception"));

        mockMvc.perform(get("/sprint/current"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testCloseCurrentSprintSuccess() throws Exception {
        SprintManager sprintManager = new SprintManager();
        sprintManager.setSprint("1");
        sprintManager.setCurrentSprint(true);

        List<Bug> bugs = new ArrayList<>();
        Bug bug = new Bug();
        bug.setSprint("1");
        bug.setStatus("Done");
        bugs.add(bug);

        when(sprintRepository.findByCurrentSprint(true)).thenReturn(sprintManager);
        when(bugRepository.findBySprintAndStatus(anyString(), anyString())).thenReturn(bugs);

        mockMvc.perform(get("/sprint/close"))
                .andExpect(status().isOk());
    }

    @Test
    public void testCloseCurrentSprintInternalServerError() throws Exception {
        when(sprintRepository.findByCurrentSprint(true)).thenThrow(new RuntimeException("Exception"));

        mockMvc.perform(get("/sprint/close"))
                .andExpect(status().isInternalServerError());
    }
}
