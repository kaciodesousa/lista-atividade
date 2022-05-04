package com.lineoculos.apiloja;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    //Salvar produtos
    @PostMapping(path="/")
    public @ResponseBody Integer incluir (@RequestBody Produto p) {
        repository.save(p);
        return p.getId();
    }

    //Listar produtos
    @GetMapping(path="/")
    public @ResponseBody Iterable<Produto> listar() {
        return repository.findAll();
      }

    //Alterar produtos
    @PutMapping(path="/")
    public  @ResponseBody Produto atualizar(@RequestBody Produto p) {
        repository.save(p);
        return p;
    }

    //Deletar produto
    @DeleteMapping(path = "/{id}")
    public @ResponseBody String apagar(@PathVariable int id) {
        repository.deleteById(id);
        return "Ok ao apagar!";
    }

    //Listar ID
    @GetMapping(path = "/{id}")
    public@ResponseBody Optional<Produto> selecionar(@PathVariable int id) {
        return repository.findById(id);
    }
}
