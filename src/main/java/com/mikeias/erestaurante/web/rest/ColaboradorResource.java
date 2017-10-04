package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.domain.Colaborador;

import com.mikeias.erestaurante.repository.ColaboradorRepository;
import com.mikeias.erestaurante.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

/**
 * REST controller for managing Colaborador.
 */
@RestController
@RequestMapping("/api")
public class ColaboradorResource {

    private final Logger log = LoggerFactory.getLogger(ColaboradorResource.class);

    private static final String ENTITY_NAME = "colaborador";

    private final ColaboradorRepository colaboradorRepository;

    public ColaboradorResource(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    /**
     * POST  /colaboradors : Create a new colaborador.
     *
     * @param colaborador the colaborador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colaborador, or with status 400 (Bad Request) if the colaborador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colaboradors")
    @Timed
    public ResponseEntity<Colaborador> createColaborador(@Valid @RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to save Colaborador : {}", colaborador);
        if (colaborador.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new colaborador cannot already have an ID")).body(null);
        }
        Colaborador result = colaboradorRepository.save(colaborador);
        return ResponseEntity.created(new URI("/api/colaboradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colaboradors : Updates an existing colaborador.
     *
     * @param colaborador the colaborador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colaborador,
     * or with status 400 (Bad Request) if the colaborador is not valid,
     * or with status 500 (Internal Server Error) if the colaborador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colaboradors")
    @Timed
    public ResponseEntity<Colaborador> updateColaborador(@Valid @RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to update Colaborador : {}", colaborador);
        if (colaborador.getId() == null) {
            return createColaborador(colaborador);
        }
        Colaborador result = colaboradorRepository.save(colaborador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colaborador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colaboradors : get all the colaboradors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of colaboradors in body
     */
    @GetMapping("/colaboradors")
    @Timed
    public List<Colaborador> getAllColaboradors() {
        log.debug("REST request to get all Colaboradors");
        List<Colaborador> cs =  colaboradorRepository.findAllWithEagerRelationships();

        Colaborador col = colaboradorRepository.findByUsuarioIsCurrentUser();

        if(col.getCargos() != null && !col.getCargos().isEmpty()) {
            for (Cargo c : col.getCargos()) {
                if (c.getPermissao() != null && c.getPermissao().contains("colaborador")) {
                    col.setId((long) -1);
                    cs.add(col);
                    return cs;
                }
            }
        }

        cs.removeIf(colaborador -> !colaborador.getId().equals(col.getId()));

        return cs;

     }

    /**
     * GET  /colaboradors/:id : get the "id" colaborador.
     *
     * @param id the id of the colaborador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colaborador, or with status 404 (Not Found)
     */
    @GetMapping("/colaboradors/{id}")
    @Timed
    public ResponseEntity<Colaborador> getColaborador(@PathVariable Long id) {
        log.debug("REST request to get Colaborador : {}", id);
        Colaborador colaborador = colaboradorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(colaborador));
    }


    /**
     * DELETE  /colaboradors/:id : delete the "id" colaborador.
     *
     * @param id the id of the colaborador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colaboradors/{id}")
    @Timed
    public ResponseEntity<Void> deleteColaborador(@PathVariable Long id) {
        log.debug("REST request to delete Colaborador : {}", id);
        colaboradorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
