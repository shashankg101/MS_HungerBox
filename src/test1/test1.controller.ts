import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { TelemetryClient } from 'applicationinsights';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

@Controller('test1')
export class Test1Controller {
  private secretClient: SecretClient;

  constructor(private readonly appInsights: TelemetryClient) {
    const vaultName = process.env.VAULT_NAME;
    const vaultUrl = `https://${vaultName}.vault.azure.net`;
    this.secretClient = new SecretClient(
      vaultUrl,
      new DefaultAzureCredential(),
    );
  }

  @Get()
  async testLogging(): Promise<string> {
    try {
      // Retrieve a secret from Azure Key Vault
      const secretName = process.env.SECRET_NAME;
      const secretBundle = await this.secretClient.getSecret(secretName);

      // Get the secret value
      const secretValue = secretBundle.value;

      // Log the secret to Application Insights
      this.appInsights.trackTrace({
        message: `Retrieved secret: ${secretName}, value: ${secretValue}`,
      });

      // Return the secret value
      return secretValue;
    } catch (error) {
      console.error('Error in testLogging method of Test1Controller:', error);
      this.appInsights.trackException({ exception: error });
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
