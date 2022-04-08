from dataclasses import dataclass
import ormar
from database import database, metadata


class Commodity(ormar.Model):
    class Meta:
        metadata = metadata
        database = database 
        tablename = 'Commodities'

    id: int = ormar.Integer(primary_key=True)
    nome: str = ormar.String(max_length=100)


class Oferta(ormar.Model):
    class Meta:
        metadata = metadata
        database = database
        tablename = 'Produtos'

    id: int = ormar.Integer(primary_key=True)
    data_cadastro: str = ormar.DateTime()
    data_disponivel: str = ormar.DateTime()
    quantidade: int = ormar.Integer()
    preco: float = ormar.Float()


class Usuario(ormar.Model):
    class Meta:
        metadata = metadata
        database = database
        tablename = 'Usuarios'

    id: int = ormar.Integer(primary_key=True)
    nome: str = ormar.String(max_length=200)
    telefone: str = ormar.String(max_length=20)
    email: str = ormar.String(max_length=200)
    logradouro: str = ormar.String(max_length=200)
    numero: int = ormar.Integer()
    complemento: str = ormar.String(max_length=200, nullable=True)
    cep: str = ormar.String(max_length=20)
    cidade: str = ormar.String(max_length=200)
    estado: str = ormar.String(max_length=30)
    cpf_cnpj: str = ormar.String(max_length=30)
    tipo: str = ormar.String(max_length=20)
    senha: str = ormar.String(max_length=50)

    commodities = ormar.ManyToMany(Commodity, through=Oferta)

    def __str__(self):
        return 'nome: ' + self.nome + '\nemail: ' + self.email
