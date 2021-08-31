import {InternacionalizacaoResource} from './shared/message/internacionalizacao.resource';

/**
 * Implementação responsável por prover as 'descrições' e 'mensagens' utilizadas na aplicação em um único local.
 *
 * @author Guiliano Rangel (UEG)
 */
export class AppMessage implements InternacionalizacaoResource {

  private resource: object;

  /**
   * Construtor da classe.
   */
  constructor() {
    this.resource = {
      // LABEL
      LABEL_OK: 'OK',
      LABEL_SAIR: 'Sair',
      LABEL_SIM: 'Sim',
      LABEL_NAO: 'Não',
      LABEL_PESQUISAR: 'Pesquisar',
      LABEL_LIMPAR: 'Limpar',
      LABEL_SALVAR: 'Salvar',
      LABEL_CANCELAR: 'Cancelar',
      LABEL_VOLTAR: 'Voltar',
      LABEL_LOGIN: 'Login',
      LABEL_INFORME_LOGIN: 'Digite seu usuário',
      LABEL_INFORME_SENHA: 'Digite sua senha',
      LABEL_ENTRAR: 'Entrar',
      LABEL_USUARIO: 'Usuário',
      LABEL_ADICIONAR_NOVO: 'Adicionar Novo',
      LABEL_FILTRO_PARA_PESQUISA: 'Filtros para Pesquisa',
      LABEL_STATUS: 'Status',
      LABEL_TODOS: 'Todos',
      LABEL_INATIVAR: 'Inativar',
      LABEL_ATIVAR: 'Ativar',
      LABEL_ATIVO: 'Ativo',
      LABEL_INATIVO: 'Inativo',
      LABEL_VISUALIZAR: 'Visualizar',
      LABEL_ALTERAR: 'Alterar',
      LABEL_ACOES: 'Ações',
      LABEL_NOME: 'Nome',
      LABEL_INFORME_NOME: 'Informe o nome',
      LABEL_DESCRICAO: 'Descrição',
      LABEL_ENTIDADE: 'Entidade',
      LOGIN_EMAIL: 'E-mail',
      LABEL_EXPORTAR: 'Exportar',
      LABEL_SELECIONE: 'Selecione',



      // Mensagem sitema
      MSG_DESEJA_SAIR_SISTEMA: 'Deseja sair do sistema?',

      TITLE_TODOS_OS_MEUS_SISTEMA: 'Todos os meus sistemas',
      TITLE_ADMINISTRADOR: 'Administrador',
      TITLE_SISTEMA_NOME: 'Portal de Autenticação',

      TITLE_SISTEMA_ORGAO_NOME: 'Secretaria de Segurança Pública',


      // Textos UC003-Manter Grupo
      LABEL_LISTAR_GRUPO: 'Lista de grupos',
      LABEL_GRUPO: 'Grupo',
      LABEL_GRUPO_HINT: 'Digite o nome do grupo',
      LABEL_GRUPO_DESCRICAO_HINT: 'Digite a descriação para o grupo',
      LABEL_DADOS_GRUPO: 'Dados do grupo',
      LABEL_SISTEMA_PERMISSOES: 'Sistema e Permissões',
      LABEL_PESQUISAR_GRUPO: 'Group Search',
      LABEL_SISTEMA: 'Sistema',
      LABEL_MODULO: 'Módulo',
      LABEL_MODULO_BUSCA_HINT: 'Buscar módulo',
      LABEL_MODULO_FILTRO_HINT: 'Filtrar módulo',
      LABEL_ALTERAR_GRUPO: 'Alterar Grupo' ,
      LABEL_INCLUIR_GRUPO: 'Incluir Grupo',
      LABEL_VISUALIZAR_GRUPO: 'Visualizar Grupo',
      LABEL_ID: 'Código do Grupo',
      LABEL_DESC_GRUPO: 'Descrição do Grupo',


      // Textos UC004_Manter_Usuario
      LABEL_PESQUISAR_USUARIO: 'Pesquisar Usuário',
      LABEL_ALTERAR_USUARIO: 'Alterar Usuário',
      LABEL_INCLUIR_USUARIO: 'Incluir Usuário',
      LABEL_VISUALIZAR_USUARIO: 'Visualizar Usuário',
      LABEL_USUARIO_HINT: 'Digite o nome do usuário',
      LABEL_LOGIN_HINT: 'Digite o login do usuário',
      LABEL_TIPO_CADASTRO: 'Tipo de Cadastro',
      LABEL_STATUS_PORTAL: 'Status no Portal',
      LABEL_DATA_ULTIMO_ACESSO: 'Data do Último Acesso',
      LABEL_EMAIL: 'E-mail',
      LABEL_INFORME_EMAIL: 'Informe o E-mail',
      LABEL_CPF: 'CPF',
      LABEL_INFORME_CPF: 'Informe o CPF',
      LABEL_STATUS_AD: 'Status no AD',
      LABEL_ACESSO_BLOQUEADO: 'Acesso Bloqueado',
      LABEL_SERVIDOR_INTERNO: 'Servidor Interno',
      LABEL_TELEFONES: 'Telefones',
      LABEL_GRUPOS_ACESSO: 'Grupos de Acesso',
      LABEL_NOME_GRUPO_VINCULADO: 'Nome do Grupo Vinculado',
      LABEL_REMOVER: 'Remover',
      LABEL_REMOVER_GRUPO: 'Remover Grupo',
      LABEL_REMOVER_TELEFONE: 'Remover Telefone',
      LABEL_ADICIONAR: 'Adicionar',
      LABEL_ADICIONAR_TELEFONE: 'Adicionar Telefone',
      LABEL_ADICIONAR_GRUPO: 'Adicionar Grupo',
      LABEL_TIPO_TELEFONE: 'Tipo de Telefone',
      LABEL_DDD: 'DDD',
      LABEL_INFORME_DDD: 'Informe o DDD',
      LABEL_TELEFONE: 'Telefone',
      LABEL_INFORME_TELEFONE: 'Informe o Número do Telefone',
      LABEL_VINCULAR_AD: 'Vincular AD',
      LABEL_SELECIONAR_USUARIO_AD: 'Selecionar Usuário do AD',
      LABEL_PRIMEIRO_NOME: 'Primeiro Nome',
      LABEL_INFORME_PRIMEIRO_NOME: 'Informe o Primeiro Nome',
      LABEL_ULTIMO_NOME: 'Último Nome',
      LABEL_INFORME_ULTIMO_NOME: 'Informe o Último Nome',
      LABEL_VINCULAR: 'Vincular',

      // Textos Auditoria
      LABEL_LISTAR_AUDITORIA: 'Lista de Auditorias',
      LABEL_PESQUISAR_AUDITORIA: 'Pesquisar Log de Auditoria',
      LABEL_DADOS_AUDITORIA: 'Dados da Auditoria',
      LABEL_VISUALIZAR_AUDITORIA: 'Visualizar Log',
      LABEL_TIPO_USUARIO: 'Tipo de Usuário',
      LABEL_TIPO_OPERACAO: 'Tipo de Operação',
      LABEL_DATA_OPERACAO: 'Data da Operação',
      LABEL_DATA_INICIAL: 'Data Inicial',
      LABEL_DATA_FINAL: 'Data Final',
      LABEL_DETALHES_LOG: 'Visualizar Detalhes de Log de Auditoria',
      LABEL_DETALHES: 'Detalhes',
      LABEL_DETALHES_DO_LOG: 'Detalhes do log',
      LABEL_DADOS_USUARIO: 'Dados do Usuário',
      LABEL_IP_USUARIO: 'IP do Usuário',
      LABEL_VISUALIZAR_IMPRESSAO: 'Visualizar Impressão',

      MAP_OPTION_INCLUSAO: 'Inclusão',
      MAP_OPTION_ALTERACAO: 'Alteração',
      MAP_OPTION_EXCLUSAO: 'Exclusão',
      MAP_OPTION_CONSULTA: 'Consultar',

      // PAGINATOR
      PAGINATOR_ITENS_POR_PAGINA: 'Itens por página',
      PAGINATOR_PROXIMA_PAGINA: 'Próxima página',
      PAGINATOR_PAGINA_ANTERIOR: 'Página anterior',
      PAGINATOR_ULTIMA_PAGINA: 'Última página',
      PAGINATOR_PRIMEIRA_PAGINA: 'Primeira página',

      // MSG
      ME001: 'Erro Inesperado.',
      ME002: 'Token inválido.',
      ME003: 'Nenhum registro enconrado.',
      MSG001: 'Campo obrigat\u00F3rio n\u00E3o preenchido.',
      MSG002: 'Deseja sair do sistema?',
      MSG003: 'Usu\u00E1rio n\u00E3o cadastrado.',
      MSG004: 'Usu\u00E1rio e senha n\u00E3o conferem.',
      MSG005: 'Usu\u00E1rio est\u00E1 inativo no sistema AD.',
      MSG006: 'Deseja remover este item?',
      MSG007: 'Opera\u00E7\u00E3o realizada com sucesso.',
      MSG008: 'Usu\u00E1rio est\u00E1 inativo no portal.',
      MSG009: 'Usu\u00E1rio n\u00E3o tem permiss\u00E3o de acesso ao sistema desejado.',
      MSG010: 'Confirmar operação?',
      MSG011: 'O Grupo informado já foi adicionado ao Usuário.',
      MSG012: 'Nenhum usuário foi selecionado.',
      MSG013: 'O CPF informado já está em uso.',
      MSG014: 'O Telefone informado já foi adicionado ao Usuário.',
      MSG015: 'Nenhum resultado informado para os filtros informados.',
      MSG016: 'Al\u00E9m do filtro Tipo de Pessoa \u00E9 obrigat\u00F3rio informar mais algum filtro.',
      MSG017: 'Deve ser informado, no m\u00EDnimo, 4 caracteres para pesquisar pelo Grupo.',
      MSG018: 'O CPF informado \u00E9 inv\u00E1lido.',
      MSG019: 'Deve ser informado, no m\u00EDnimo, 4 caracteres para pesquisar pelo Nome.',
      MSG026: 'O login informado j\u00E1 existe.',
      MSG029: 'O documento informado j\u00E1 est\u00E1 no cadastro dessa pessoa.',
      MSG033: 'Deseja inativar este item?',
      MSG034: 'Deseja ativar este item?',
      MSG035: 'J\u00E1 existe um grupo com o nome informado.',
      MSG036: 'Nenhum usu\u00E1rio foi selecionado.',
      MSG038: 'O login informado n\u00E3o foi encontrado no sistema AD.',
      MSG039: '\u00C9 obrigat\u00F3rio informar pelo menos um grupo.',
      MSG041: 'A data final deve ser maior ou igual a data inicial.',
      MSG042: 'Usu\u00E1rio Bloqueado',
      MSG044: 'Usu\u00E1rio n\u00E3o tem permiss\u00E3o de acesso a funcionalidade acessada.',
      MSG046: 'Tornar cadastro Amigo?',
      MSG047: 'Deixar de ser Amigo do cadastro?',

      // Validation
      required: 'Campo obrigat\u00F3rio n\u00E3o preenchido.',
      'Mask error': 'Valor inválido',
    };
  }

  /**
   * Retorna a 'descrição' conforme a 'chave' informada.
   *
   * @param key -
   * @returns -
   */
  getDescription(key: string): string {
    return this.resource[key];
  }

  /**
   * Retorna a 'mensagem' conforme a 'chave' informada.
   *
   * @param key -
   * @returns -
   */
  getMessage(key: string): string {
    return this.getDescription(key);
  }
}
